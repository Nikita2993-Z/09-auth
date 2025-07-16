import { NextResponse } from 'next/server';

export async function POST() {
  
  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/logout',
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  
  const response = NextResponse.json(null, { status: backendRes.status });


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