import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const res = NextResponse.json({ message: 'Setting a test cookie' });

  res.cookies.set('testCookie', 'testValue', {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24,
  });

  return res;
}