import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user'); // Changed from auth_token to user
  const isAuthPage = request.nextUrl.pathname === '/login';
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard-doctor');

  // Nếu đã đăng nhập và cố truy cập trang login, chuyển hướng về dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard-doctor', request.url));
  }

  // Nếu chưa đăng nhập và cố truy cập dashboard, chuyển hướng về trang login
  if (!isAuthenticated && isDashboardRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ['/login', '/dashboard-doctor/:path*'],
}; 