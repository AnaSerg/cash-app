import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const archivedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
            archived: true,
        }
    });

    return NextResponse.json(archivedCategory, { status: 200 });
};