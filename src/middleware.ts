import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";
import { IUserToken } from "./interface/token.interface";

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser() as IUserToken;


    if (!user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
        return NextResponse.next()
    }

    if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (user?.role === "SUPERADMIN" && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.next()
    }


    if (user?.role === "CUSTOMER" && request.nextUrl.pathname.startsWith("/customer")) {
        return NextResponse.next()
    }


    if (request.nextUrl.pathname === "/product") {
        return NextResponse.next();
    }

    const productDetailsPattern = /^\/product\/[^/]+$/;

    if (user && productDetailsPattern.test(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
}


export const config = {
    matcher: [
        "/customer/:path",
        "/admin/:path",
        "/login",
        "/product/:path"
    ]
}