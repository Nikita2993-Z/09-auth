import { NextRequest, NextResponse } from 'next/server';

// Приватные маршруты (всё, что начинается с '/profile' или '/notes')
const privateRoutes = ['/profile', '/notes'];
// Публичные маршруты для входа/регистрации
const publicRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // Неавторизованным доступ к приватным страницам запрещён
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Авторизованным запрещён доступ к страницам входа/регистрации
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // По умолчанию продолжаем обработку
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