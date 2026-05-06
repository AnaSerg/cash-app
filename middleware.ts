export const runtime = "nodejs";
import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register");

    if (!isLoggedIn && !isAuthPage) {
        return Response.redirect(new URL("/login", req.url));
    }

    if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/dashboard", req.url));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};