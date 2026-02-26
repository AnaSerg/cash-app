import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const GET = async (req: Request) => {
    try {
        const targets = await prisma.target.findMany({
            orderBy: { id: 'asc'}
        })
        return NextResponse.json(targets);
    } catch (error: unknown) {
        return NextResponse.json(error);
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const newTarget = await prisma.target.create({
            data: {
                title: body.title,
                sum: Number(body.sum),
                period: Number(body.period),
            }
        });

        return NextResponse.json(newTarget, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to create target",
            details: error.message
        }, { status: 500 });
    }
};