import "./ui/globals.css";
import React from "react";
import { manrope } from "@/app/ui/fonts";
import Providers from "@/app/ui/components/providers";

export const metadata = {
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {

    return (
        <Providers>
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </head>
            <body className={`${manrope.className} antialiased mt-1 ml-4 mr-4`}>
            {children}
            </body>
            </html>
        </Providers>
    );
}