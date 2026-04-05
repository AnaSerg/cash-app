import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async (req: Request) => {
    const now = new Date()

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: 'asc' },
            where: {
                archived: false
            },
            select: {
                id: true,
                name: true,
                limit: true,
                subcategories: {
                    select: {
                        id: true,
                        name: true,
                        expenses: {
                            where: {
                                createdAt: { gte: startOfMonth, lt: startOfNextMonth }
                            },
                            select: {
                                amount: true
                            }
                        },
                    }
                },
                expenses: {
                    where: {
                        createdAt: { gte: startOfMonth, lt: startOfNextMonth }
                    },
                    select: {
                        amount: true
                    }
                },
            }
        });

        const result = categories.map(cat => ({
            ...cat,
            totalSpent:
                cat.expenses.reduce((sum, e) => sum + Number(e.amount), 0) +
                cat.subcategories.reduce((sum, sub) =>
                    sum + sub.expenses.reduce((s, e) => s + Number(e.amount), 0), 0),
            remaining:
                cat.limit -
                (cat.expenses.reduce((sum, e) => sum + Number(e.amount), 0) +
                cat.subcategories.reduce((sum, sub) =>
                    sum + sub.expenses.reduce((s, e) => s + Number(e.amount), 0), 0)),
            subcategories: cat.subcategories.map(sub => ({
                ...sub,
                spent: sub.expenses.reduce((sum, e) => sum + Number(e.amount), 0)
            }))
        }));

        const totals = {
            totalSpent: result.reduce((sum, cat) => sum + cat.totalSpent, 0),
            limit: result.reduce((sum, cat) => sum + cat.limit, 0),
            remaining: result.reduce((sum, cat) => sum + cat.remaining, 0)
        };

        const finalResult = {
            categories: result,
            totals: totals
        };

        return NextResponse.json(finalResult);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const newCategory = await prisma.category.create({
            data: {
                name: body.name,
                limit: Number(body.limit),
            }
        });

        return NextResponse.json(newCategory, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to create category",
            details: error.message
        }, { status: 500 });
    }
};