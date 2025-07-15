import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Отправляем запрос на внешний бэкенд
  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await backendRes.json();
  const response = NextResponse.json(data, {
    status: backendRes.status,
  });

  // Проксируем Set-Cookie от бэкенда в ответ клиенту
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