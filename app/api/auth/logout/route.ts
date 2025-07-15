import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Проксируем запрос на внешний бэкенд
  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  );

  // Если бэкенд вернул ошибку, пробросим статус и сообщение
  const responseBody = await backendRes.text();
  const response = NextResponse.json(
    responseBody ? JSON.parse(responseBody) : null,
    { status: backendRes.status }
  );

  // Проксируем Set-Cookie из ответа бэкенда
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