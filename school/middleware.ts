// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const role = request.cookies.get('role')?.value || 'student';

//   if (request.nextUrl.pathname === '/') {
//     if (role === 'admin') {
//       return NextResponse.redirect(new URL('/admin', request.url));
//     } else if (role === 'teacher') {
//       return NextResponse.redirect(new URL('/teacher', request.url));
//     } else if (role === 'student') {
//       return NextResponse.redirect(new URL('/student', request.url));
//     } else if (role === 'parent') {
//       return NextResponse.redirect(new URL('/parent', request.url));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/']
// };

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

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

  // If there's no token, the user is not authenticated
  if (!token) {
    // If the user is not on the login page, redirect to login
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next(); // If on the login page, allow access
  }

  const decodedToken = verifyToken(token);
  console.log(decodedToken);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const role = 'admin';

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

// export const config = {
//   matcher: '/((?!_next/static|_next/image|favicon.ico|api/).*)'
// };
