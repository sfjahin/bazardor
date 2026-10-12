import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next();

}

export const config = {
    matcher: [
        "/product/:path*",
        "/profile"
    ],
};