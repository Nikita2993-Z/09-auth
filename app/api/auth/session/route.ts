import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const backendRes = await fetch(`${BACKEND}/auth/session`, {
      headers: { cookie: cookieHeader },
      credentials: 'include',
    });

    // если нет активной сессии — возвращаем null
    if (backendRes.status === 204 || backendRes.status === 200 && (await backendRes.text()) === '') {
      return NextResponse.json(null);
    }

    const data = await backendRes.json();
    const response = NextResponse.json(data);

    // проксируем куки, если есть
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
  } catch (err) {
    // упали по-настоящему — логируем и возвращаем пустую сессию
    console.error('Session proxy error', err);
    return NextResponse.json(null);
  }
}