import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  );

  const responseBody = await backendRes.text();
  const data = responseBody ? JSON.parse(responseBody) : null;
  const response = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('Set-Cookie', setCookie);
  }

  return response;
}