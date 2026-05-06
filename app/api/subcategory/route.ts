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

        const newSubcategory = await prisma.subcategory.create({
            data: {
                name: body.name,
                categoryId: Number(body.categoryId),
                userId: session.user.id
            }
        });

        return NextResponse.json(newSubcategory, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            error: "Failed to create subcategory",
            details: error.message
        }, { status: 500 });
    }
};