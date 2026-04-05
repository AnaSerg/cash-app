import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json();

    const updatedSubCategory = await prisma.subcategory.update({
        where: { id: Number(id) },
        data: {
            name: body.name,
        }
    });

    return NextResponse.json(updatedSubCategory, { status: 200 });
};

export const DELETE = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    await prisma.$transaction([
        prisma.expense.updateMany({
            where: { subcategoryId: Number(id) },
            data: { subcategoryId: null },
        }),
        prisma.subcategory.delete({
            where: { id: Number(id) },
        }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
};