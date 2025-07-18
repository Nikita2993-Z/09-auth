import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'https://notehub-api.goit.study';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const backendRes = await fetch(`${BACKEND}/users/me`, {
    headers: { cookie: cookieHeader },
    credentials: 'include',
  });
  if (!backendRes.ok) {
    return NextResponse.json(
      { error: await backendRes.text() },
      { status: backendRes.status }
    );
  }
  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: 200 });

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

export async function PATCH(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const body = await req.json();

  const backendRes = await fetch(`${BACKEND}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const contentType = backendRes.headers.get('content-type') ?? '';
  let data: unknown;
  if (contentType.includes('application/json')) {
    data = await backendRes.json();
  } else {
    data = await backendRes.text();
  }

  const response = NextResponse.json(data, { status: backendRes.status });

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