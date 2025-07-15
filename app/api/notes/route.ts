import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams();
  params.set('page', searchParams.get('page') ?? '1');
  params.set('perPage', searchParams.get('perPage') ?? '12');
  if (searchParams.has('search')) params.set('search', searchParams.get('search')!);
  if (searchParams.has('tag')) params.set('tag', searchParams.get('tag')!);

  const backendRes = await fetch(
    `https://notehub-api.goit.study/notes?${params.toString()}`,
    {
      method: 'GET',
      headers: { cookie: cookieHeader },
      credentials: 'include',
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const body = await req.json();

  const backendRes = await fetch(
    'https://notehub-api.goit.study/notes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();
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