import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  let backendRes;
  try {
    backendRes = await fetch(`${BACKEND}/auth/session`, {
      headers: { cookie: cookieHeader },
      credentials: 'include',
    });
  } catch (err) {
    console.error('Session fetch error:', err);
    return NextResponse.json(null);
  }

  
  if (!backendRes.ok) {
    return NextResponse.json(null);
  }

  const contentType = backendRes.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(null);
  }

  const data = await backendRes.json();
  const response = NextResponse.json(data);

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    setCookie
      .split(',')
      .map(c => c.trim())
      .forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
  }

  return response;
}