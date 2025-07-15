import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const backendRes = await fetch(
    'https://notehub-api.goit.study/users/me',
    {
      method: 'GET',
      headers: { cookie: cookieHeader },
      credentials: 'include',
    }
  );

  if (!backendRes.ok) {
    return new NextResponse(null, { status: backendRes.status });
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const body = await req.json();

  const backendRes = await fetch(
    'https://notehub-api.goit.study/users/me',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}