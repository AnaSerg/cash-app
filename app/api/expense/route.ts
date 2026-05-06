import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();

        const newExpense = await prisma.expense.create({
            data: {
                description: body.description,
                amount: Number(body.amount),
                categoryId: Number(body.categoryId),
                subcategoryId: Number(body.subCategoryId) || null,
                userId: session.user.id,
            }
        });

        console.log(newExpense);

        return NextResponse.json(newExpense, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to create expense",
            details: error.message
        }, { status: 500 });
    }
};