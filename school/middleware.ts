import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('role')?.value || 'student';

  if (request.nextUrl.pathname === '/') {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', request.url));
    } else if (role === 'student') {
      return NextResponse.redirect(new URL('/student', request.url));
    } else if (role === 'parent') {
      return NextResponse.redirect(new URL('/parent', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
