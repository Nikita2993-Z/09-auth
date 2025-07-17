import { NextRequest, NextResponse } from 'next/server';
const privateRoutes = ['/profile', '/notes'];

const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  
  if (!accessToken && refreshToken) {
    try {
      
      const sessionRes = await fetch(`${origin}/api/auth/session`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (sessionRes.ok) {
        const setCookie = sessionRes.headers.get('set-cookie');
        const response = NextResponse.next();
        if (setCookie) {
          response.headers.set('Set-Cookie', setCookie);
        }
        
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/profile', request.url));
        }
        return response;
      }
    } catch {
    
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
