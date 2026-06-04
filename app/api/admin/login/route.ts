import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'ns_admin';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (session?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const validUser = process.env.ADMIN_USERNAME ?? 'admin123';
  const validPass = process.env.ADMIN_PASSWORD ?? 'admin123';

  if (username === validUser && password === validPass) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, 'authenticated', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, message: 'Invalid username or password' }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
