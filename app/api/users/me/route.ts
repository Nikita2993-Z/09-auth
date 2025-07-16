import { NextRequest, NextResponse } from 'next/server';
const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

export async function GET(req: NextRequest) {
  const res = await fetch(`${BACKEND}/users/me`, {
    headers: { cookie: req.headers.get('cookie') ?? '' },
    credentials: 'include',
  });
  if (!res.ok) return NextResponse.error();
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BACKEND}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) return NextResponse.error();
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}