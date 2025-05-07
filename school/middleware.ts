import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decodeToken, verifyToken } from './lib/jwt';

const roleRoutes: Record<string, string> = {
  admin: '/admin',
  teacher: '/teacher',
  student: '/student',
  parent: '/parent'
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;

  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === '/login';
  const isRootPage = pathname === '/';

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const role = decodeToken(token) as string;

  if (!role && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (role && isLoginPage) {
    const redirectPath = roleRoutes[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  if (role && isRootPage) {
    const redirectPath = roleRoutes[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|api/|frambanner.jpg).*)'
};
