"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const schema = z.object({
    email: z.string().check(z.email("Некорректный email")),
    password: z.string().min(6, "Минимум 6 символов"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.error) {
            setError("root", { message: "Неверный email или пароль" });
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex flex-col justify-between px-2 py-12" style={{ background: "#e8e3db" }}>

            <div className="flex flex-col items-center gap-2 mt-12">
                <h1 className="text-6xl font-bold tracking-tight" style={{ color: "#1a1a2e" }}>куш</h1>
                <p className="text-sm opacity-50">следи за своими расходами</p>
            </div>

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 -mt-30">
                <div className="flex flex-col gap-1">
                    <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        autoComplete="off"
                        placeholder="Email"
                        className="bg-white border-0 h-12 px-5 shadow-sm text-base"
                    />
                    {errors.email && <p className="text-red-400 text-xs px-2">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <Input
                        {...register("password")}
                        id="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Пароль"
                        className="bg-white border-0 h-12 px-5 shadow-sm text-base"
                    />
                    {errors.password && <p className="text-red-400 text-xs px-2">{errors.password.message}</p>}
                </div>

                {errors.root && <p className="text-red-400 text-xs px-2">{errors.root.message}</p>}

                <Button
                    className="w-full h-12 text-base mt-2"
                    style={{ background: "#8b7cf8" }}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Вход..." : "Войти"}
                </Button>
            </form>

            {/* Низ — ссылка на регистрацию */}
            <p className="text-center text-sm opacity-50">
                Нет аккаунта?{" "}
                <Link href="/register" className="opacity-100" style={{ color: "#8b7cf8" }}>
                    Зарегистрироваться
                </Link>
            </p>
        </div>
    )
}