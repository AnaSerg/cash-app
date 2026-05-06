import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().check(z.email()),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, surname, email, password } = registerSchema.parse(body);

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json(
                { error: "Пользователь уже существует" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { name, surname, email, password: hashedPassword },
        });

        return NextResponse.json(
            { id: user.id, email: user.email },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}