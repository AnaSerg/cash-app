import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {DayTotal} from "../types";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const result = await prisma.$queryRaw<DayTotal[]>`
          SELECT 
            DATE_TRUNC('day', "createdAt") as day,
            SUM(amount)::float as total
          FROM "Expense"
          WHERE "createdAt" >= ${startOfMonth} AND "createdAt" < ${startOfNextMonth}
          GROUP BY DATE_TRUNC('day', "createdAt")
        `

        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to fetch expenses",
            details: error.message
        }, { status: 500 });
    }
};