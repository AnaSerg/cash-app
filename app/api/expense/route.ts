import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

/*
export const GET = async (req: Request) => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: { id: 'asc'}
        })
        return NextResponse.json(targets);
    } catch (error: unknown) {
        return NextResponse.json(error);
    }
}

 */
export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const newExpense = await prisma.expense.create({
            data: {
                description: body.description,
                amount: Number(body.amount),
                categoryId: Number(body.categoryId),
            }
        });

        return NextResponse.json(newExpense, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to create expense",
            details: error.message
        }, { status: 500 });
    }
};