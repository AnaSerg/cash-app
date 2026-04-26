import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    const now = new Date()

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    try {
        const [categories, monthTotalAgg, archivedCategoryRows] =
            await Promise.all([
                prisma.category.findMany({
                    orderBy: { id: "asc" },
                    where: { archived: false },
                    select: {
                        id: true,
                        name: true,
                        limit: true,
                    },
                }),
                prisma.expense.aggregate({
                    where: {
                        createdAt: {
                            gte: startOfMonth,
                            lt: startOfNextMonth,
                        },
                    },
                    _sum: { amount: true },
                }),
                prisma.category.findMany({
                    where: { archived: true },
                    select: { id: true },
                }),
            ]);

        const totalSpentMonth = Number(monthTotalAgg._sum.amount ?? 0);

        const archivedCategoryIds = archivedCategoryRows.map((c) => c.id);
        let archivedCategoriesMonthSpent = 0;
        if (archivedCategoryIds.length > 0) {
            const archivedMonthAgg = await prisma.expense.aggregate({
                where: {
                    createdAt: {
                        gte: startOfMonth,
                        lt: startOfNextMonth,
                    },
                    categoryId: { in: archivedCategoryIds },
                },
                _sum: { amount: true },
            });
            archivedCategoriesMonthSpent = Number(
                archivedMonthAgg._sum.amount ?? 0,
            );
        }

        const categoryIds = categories.map((c) => c.id);

        let subcategoriesRows: { id: number; name: string; categoryId: number }[] = [];
        let monthExpenses: {
            amount: unknown;
            categoryId: number;
            subcategoryId: number | null;
        }[] = [];

        if (categoryIds.length > 0) {
            [subcategoriesRows, monthExpenses] = await Promise.all([
                prisma.subcategory.findMany({
                    where: { categoryId: { in: categoryIds } },
                    orderBy: { id: "asc" },
                    select: {
                        id: true,
                        name: true,
                        categoryId: true,
                    },
                }),
                prisma.expense.findMany({
                    where: {
                        categoryId: { in: categoryIds },
                        createdAt: {
                            gte: startOfMonth,
                            lt: startOfNextMonth,
                        },
                    },
                    select: {
                        amount: true,
                        categoryId: true,
                        subcategoryId: true,
                    },
                }),
            ]);
        }

        const spentByCategoryId = new Map<number, number>();
        const spentBySubcategoryId = new Map<number, number>();
        for (const e of monthExpenses) {
            const amt = Number(e.amount);
            spentByCategoryId.set(
                e.categoryId,
                (spentByCategoryId.get(e.categoryId) ?? 0) + amt,
            );
            if (e.subcategoryId != null) {
                spentBySubcategoryId.set(
                    e.subcategoryId,
                    (spentBySubcategoryId.get(e.subcategoryId) ?? 0) + amt,
                );
            }
        }

        const subcategoriesByCategoryId = new Map<
            number,
            typeof subcategoriesRows
        >();
        for (const sub of subcategoriesRows) {
            const list = subcategoriesByCategoryId.get(sub.categoryId);
            if (list) list.push(sub);
            else subcategoriesByCategoryId.set(sub.categoryId, [sub]);
        }

        const result = categories.map((cat) => {
            const totalSpent = spentByCategoryId.get(cat.id) ?? 0;
            const subs = subcategoriesByCategoryId.get(cat.id) ?? [];
            return {
                ...cat,
                totalSpent,
                remaining: cat.limit - totalSpent,
                subcategories: subs.map((sub) => ({
                    id: sub.id,
                    name: sub.name,
                    spent: spentBySubcategoryId.get(sub.id) ?? 0,
                })),
            };
        });

        const limitSum = result.reduce((sum, cat) => sum + cat.limit, 0);
        const totals = {
            totalSpent: totalSpentMonth,
            limit: limitSum,
            remaining: limitSum - totalSpentMonth,
        };

        const finalResult = {
            categories: result,
            totals,
            archivedCategoriesMonthSpent,
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