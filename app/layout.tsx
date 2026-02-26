"use client";

import "./ui/globals.css";
import React from "react";
import { manrope } from "@/app/ui/fonts";
import Header from "@/app/ui/components/header/header";
import { usePathname } from "next/navigation";
import {Button} from "@/components/ui/button";
import {Home, PieChart} from "lucide-react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    const pathname = usePathname()
    const hideHeader = ['/profile'].includes(pathname)

    return (
        <html lang="en">
        <body className={`${manrope.className} antialiased mt-3 ml-4 mr-4`}>
            {children}
            { /* TODO: сделать сайдбар для десктопа или продумать какую-то навигацию в принципе
            <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
                <div className="flex justify-around items-center h-16">
                    <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center gap-1 h-full rounded-none">
                        <Home className="h-5 w-5" />
                        <Link href="/" className="text-xs">Главная</Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center gap-1 h-full rounded-none">
                        <PieChart className="h-5 w-5" />
                        <span className="text-xs">Категории</span>
                    </Button>
                </div>
            </nav>
            */}
        </body>
        </html>
    );
}