import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export const dynamic = "force-dynamic";

export const GET = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const categoryId = Number(id);

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const category = await prisma.category.findUnique({
        where: { id: categoryId, userId: session.user.id },
        select: {
            id: true,
            name: true,
            limit: true,
        },
    });

    if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const [subcategories, expenseRows] = await Promise.all([
        prisma.subcategory.findMany({
            where: { categoryId: category.id, userId: session.user.id },
            select: { id: true, name: true },
            orderBy: { id: "asc" },
        }),
        prisma.expense.findMany({
            where: { categoryId: category.id, userId: session.user.id },
            select: {
                id: true,
                description: true,
                amount: true,
                date: true,
                subcategoryId: true,
            },
            orderBy: { date: "desc" },
        }),
    ]);

    const subcategoryMap = new Map(subcategories.map((sub) => [sub.id, sub.name]));

    const allExpenses = expenseRows.map((e) => ({
        ...e,
        subcategoryName: e.subcategoryId
            ? (subcategoryMap.get(e.subcategoryId) ?? null)
            : null,
    }));

    const totalSpent = allExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const remaining = category.limit - totalSpent;

    return NextResponse.json({
        id: category.id,
        name: category.name,
        limit: category.limit,
        totalSpent,
        remaining,
        allExpenses,
    });
};

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json();

    const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
            name: body.name,
            limit: Number(body.limit),
        }
    });

    return NextResponse.json(updatedCategory, { status: 200 });
};