import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Берём куки из запроса
  const cookieHeader = req.headers.get('cookie') ?? '';

  // Проксируем запрос на logout, передавая куки и нужные заголовки
  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/logout',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
    }
  );

  // Формируем ответ клиенту с тем же статусом
  const response = NextResponse.json(null, { status: backendRes.status });

  // Проксируем Set-Cookie из ответа бэкенда
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('Set-Cookie', setCookie);
  }

  return response;
}