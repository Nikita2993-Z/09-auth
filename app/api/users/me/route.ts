import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') ?? '';
  let backendRes;
  try {
    backendRes = await fetch(`${BACKEND}/users/me`, {
      headers: { cookie: cookieHeader },
      credentials: 'include',
    });
  } catch (err) {
    console.error('Users/me fetch error:', err);
    // на случай сетевой ошибки — возвращаем null, но статус 200
    return NextResponse.json(null);
  }

  // Если не авторизован (401/403/404 и т.п.) — тоже просто null
  if (!backendRes.ok) {
    return NextResponse.json(null);
  }

  // Пробуем распарсить тело, если там JSON
  const text = await backendRes.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  const response = NextResponse.json(data);
  // Проксируем Set-Cookie, если есть
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    setCookie
      .split(',')
      .map((c) => c.trim())
      .forEach((cookie) => response.headers.append('Set-Cookie', cookie));
  }
  return response;
}