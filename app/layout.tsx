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
            { !hideHeader && <Header /> }
            {children}
        </body>
        </html>
    );
}