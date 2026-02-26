import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async (req: Request) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: 'asc' },
            select: {
                id: true,
                name: true,
                limit: true,
                expenses: {
                    select: {
                        amount: true
                    }
                }
            }
        });

        const result = categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            limit: cat.limit,
            totalSpent: cat.expenses.reduce((sum, e) => sum + e.amount, 0),
            remaining: cat.limit - cat.expenses.reduce((sum, e) => sum + e.amount, 0)
        }));

        return NextResponse.json(result);
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