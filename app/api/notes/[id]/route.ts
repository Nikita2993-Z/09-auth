import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'https://notehub-api.goit.study'; 
// Хочешь — замени на env, НО не ставь localhost:3000, иначе зациклится прокси!

interface RouteContext {
  params: Promise<{ id: string }>;
}

/* ---------- GET /api/notes/:id ---------- */
export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cookieHeader = req.headers.get('cookie') ?? '';

  const backendRes = await fetch(`${BACKEND}/notes/${id}`, {
    headers: { cookie: cookieHeader, 'Content-Type': 'application/json' },
    // credentials не обязателен, мы сами передаём cookie
  });

  let data: unknown = null;
  const ct = backendRes.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    try {
      data = await backendRes.json();
    } catch {
      data = null;
    }
  }

  // Если бекенд вернул 404, 401 — проксируем статус без мутаций
  const response = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('Set-Cookie', setCookie);
  }

  return response;
}

/* ---------- DELETE /api/notes/:id ---------- */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cookieHeader = req.headers.get('cookie') ?? '';

  const backendRes = await fetch(`${BACKEND}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
  });

  let data: unknown = null;
  const ct = backendRes.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    try {
      data = await backendRes.json();
    } catch {
      data = null;
    }
  }

  const response = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('Set-Cookie', setCookie);
  }

  return response;
}