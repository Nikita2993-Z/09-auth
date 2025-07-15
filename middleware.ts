import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/notes', '/profile'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const sessionRes = await fetch(new URL('/api/auth/session', req.url), {
    credentials: 'include',
  });
  const user = sessionRes.ok ? await sessionRes.json() : null;
  const isAuth = Boolean(user && user.email);

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  
  if (isPrivateRoute && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  
  if (isAuthRoute && isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/notes/:path*',
    '/profile/:path*',
    '/sign-in',
    '/sign-up',
  ],
};