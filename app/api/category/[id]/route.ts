import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json();

    console.log('BODY', body);

    const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
            name: body.name,
            limit: Number(body.limit),
        }
    });

    return NextResponse.json(updatedCategory, { status: 200 });
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const deletedCategory = await prisma.category.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
};