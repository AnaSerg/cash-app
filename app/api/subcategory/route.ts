import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const newSubcategory = await prisma.subcategory.create({
            data: {
                name: body.name,
                categoryId: Number(body.categoryId),
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