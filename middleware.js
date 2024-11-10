import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        // Allow access to login and register if no token is found
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // Verify the token
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        // Redirect authenticated users away from login or register
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
            const response = NextResponse.redirect(new URL('/', req.url));
            response.headers.set('Cache-Control', 'no-store'); // Disable caching
            return response;
        }

        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'no-store'); // Disable caching for authenticated pages
        return response;
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/login', '/register']
};
