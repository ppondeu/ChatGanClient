"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { APIResponse, Token, User } from "@/types";
import { API_URL } from "@/common/constant";

export default async function middleware(request: NextRequest) {
    console.log("middleware", request.nextUrl.pathname);
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
        console.log("login or register");
        return NextResponse.next();
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/direct/inbox', request.url))
    }
    try {

        const cookieStore = await cookies();

        const originalResponse = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (originalResponse.status === 200 && originalResponse.ok) {
            const res = NextResponse.next();
            const { data: user, statusCode } = await originalResponse.json() as APIResponse<User>;
            if (statusCode !== 200) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
            res.headers.set("x-user", JSON.stringify(user));
            return res;
        }

        if (originalResponse.status !== 401 && !originalResponse.ok) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!refreshResponse.ok) {
            console.log("refresh failed");
            return NextResponse.redirect(new URL('/login', request.url))
        }

        console.log("refresh success");

        const { data: token, statusCode } = await refreshResponse.json() as APIResponse<Token>;
        if (statusCode !== 200) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        const res = NextResponse.next();
        if (token?.accessToken) {
            res.cookies.set({
                name: "accessToken",
                value: token?.accessToken!,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
        }

        if (token?.refreshToken) {
            res.cookies.set({
                name: "refreshToken",
                value: token?.refreshToken!,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
        }

        const retryResponse = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${token?.accessToken}; refreshToken=${token?.refreshToken}`,
            },
        });

        if (!retryResponse.ok) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const { data: user } = await retryResponse.json() as APIResponse<User>;
        res.headers.set("x-user", JSON.stringify(user));
        return res;
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    // matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js|png|jpeg|woff2?|svg|json)).*)"],
    matcher: ["/", "/direct/inbox", "/direct/t/:path*"],
};
