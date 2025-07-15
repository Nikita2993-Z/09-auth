import { NextRequest, NextResponse } from 'next/server';
import type { User } from '@/types/user';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const backendRes = await fetch(
    'https://notehub-api.goit.study/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  );

 
  let data: User | null = null;
  if (backendRes.headers.get('content-type')?.includes('application/json')) {
    data = (await backendRes.json()) as User;
  }

  const response = NextResponse.json(data, {
    status: backendRes.status,
  });

 
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