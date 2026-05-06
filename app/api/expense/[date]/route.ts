import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export const GET = async (req: Request, { params }: { params: Promise<{ date: string }> }) => {
    const { date } = await params;

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T00:00:00.000Z`);
    end.setUTCDate(end.getUTCDate() + 1);

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const expenses = await prisma.expense.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lt: end,
                },
                userId: session.user.id,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                category: true,
                subcategory: true,
                createdAt: true,
            }
        });

        return NextResponse.json(expenses);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}