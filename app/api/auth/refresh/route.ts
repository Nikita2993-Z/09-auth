import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Проксируем запрос на внешний бэкенд
  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/refresh',
    {
      method: 'GET',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
    }
  );

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  // Проксируем Set-Cookie
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    setCookie
      .split(',')
      .map((c) => c.trim())
      .forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });
  }

  return response;
}