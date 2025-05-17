import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user'); 
  const isAuthPage = request.nextUrl.pathname === '/login';
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard-doctor');
  const isPharmacyRoute = request.nextUrl.pathname.startsWith('/pharmacyPage');
  const isReceptionistRoute = request.nextUrl.pathname.startsWith('/receptionistPage');

  // Nếu đã đăng nhập và cố truy cập trang login, chuyển hướng về trang phù hợp
  if (isAuthenticated && isAuthPage) {
    // Lấy thông tin user từ cookie để xác định vai trò
    const userCookie = request.cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;
    
    // Chuyển hướng dựa trên vai trò
    if (user && user.role === 'PHARMACIST') {
      return NextResponse.redirect(new URL('/pharmacyPage', request.url));
    } else if (user && user.role === 'RECEPTIONIST') {
      return NextResponse.redirect(new URL('/receptionistPage', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard-doctor', request.url));
    }
  }

  // Nếu chưa đăng nhập và cố truy cập các trang được bảo vệ
  if (!isAuthenticated && (isDashboardRoute || isPharmacyRoute || isReceptionistRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Cập nhật matcher để bao gồm cả route receptionistPage
export const config = {
  matcher: ['/login', '/dashboard-doctor/:path*', '/pharmacyPage/:path*', '/receptionistPage/:path*'],
};