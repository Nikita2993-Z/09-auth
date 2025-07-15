import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Запрос к внешнему бэкенду
  const backendRes = await fetch('https://notehub-api.goit.study/auth/session', {
    method: 'GET',
    credentials: 'include',
    headers: { cookie: req.headers.get('cookie') || '' },
  });

  // Если сессия неактивна — вернём 200 без тела
  if (backendRes.status === 204 || backendRes.status === 200 && (await backendRes.text()) === '') {
    return new NextResponse(null, { status: 200 });
  }

  // Иначе пробросим JSON-ответ пользователя
  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  // Проксируем куки (если они есть)
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