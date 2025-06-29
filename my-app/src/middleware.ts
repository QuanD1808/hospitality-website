import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user'); 
  const isAuthPage = request.nextUrl.pathname === '/login';
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard-doctor');
  const isPharmacyRoute = request.nextUrl.pathname.startsWith('/pharmacyPage');
  const isReceptionistRoute = request.nextUrl.pathname.startsWith('/receptionistPage');

  // Log current path and authentication status for debugging
  console.log('Current path:', request.nextUrl.pathname);
  console.log('Is authenticated:', isAuthenticated);

  // Nếu đã đăng nhập và cố truy cập trang login, chuyển hướng về trang phù hợp
  if (isAuthenticated && isAuthPage) {
    // Lấy thông tin user từ cookie để xác định vai trò
    const userCookie = request.cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;
    
    // Log user data for debugging
    console.log('User cookie value:', JSON.stringify(user));
    console.log('User role (raw):', user?.role);
    
    // Sử dụng cách tiếp cận an toàn với kiểm tra rõ ràng hơn
    let userRole = '';
    if (user && typeof user.role === 'string') {
      userRole = user.role.toUpperCase();
      console.log('User role (uppercase):', userRole);
    }
    
    // Kiểm tra vai trò và chuyển hướng tương ứng
    if (userRole === 'PHARMACIST') {
      console.log('Redirecting to pharmacy page');
      return NextResponse.redirect(new URL('/pharmacyPage', request.url));
    } else if (userRole === 'RECEPTIONIST') {
      console.log('Redirecting to receptionist page');
      return NextResponse.redirect(new URL('/receptionistPage', request.url));
    } else if (userRole === 'PATIENT') {
      console.log('Redirecting to home page for patient');
      return NextResponse.redirect(new URL('/', request.url));
    } else if (userRole === 'DOCTOR') {
      console.log('Redirecting to doctor dashboard');
      return NextResponse.redirect(new URL('/dashboard-doctor', request.url));
    } else {
      console.log('No specific role matched, using fallback redirect to home');
      // Fallback for any other roles or if role is not defined
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Nếu chưa đăng nhập và cố truy cập các trang được bảo vệ
  if (!isAuthenticated && (isDashboardRoute || isPharmacyRoute || isReceptionistRoute)) {
    console.log('Unauthorized access attempt, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Nếu đã đăng nhập, kiểm tra xem có truy cập đúng route dựa theo vai trò hay không
  if (isAuthenticated && (isDashboardRoute || isPharmacyRoute || isReceptionistRoute)) {
    const userCookie = request.cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;
    
    if (user) {
      const userRole = typeof user.role === 'string' ? user.role.toUpperCase() : '';
      console.log('Authenticated user accessing protected route:', request.nextUrl.pathname);
      console.log('User role for route check:', userRole);
      
      // Kiểm tra quyền truy cập route
      const isDoctorAccessing = isDashboardRoute && userRole !== 'DOCTOR';
      const isPharmacistAccessing = isPharmacyRoute && userRole !== 'PHARMACIST';
      const isReceptionistAccessing = isReceptionistRoute && userRole !== 'RECEPTIONIST';
      
      // Nếu truy cập sai route theo vai trò, chuyển hướng về trang phù hợp
      if (isDoctorAccessing || isPharmacistAccessing || isReceptionistAccessing) {
        console.log('User attempting to access unauthorized route, redirecting to appropriate page');
        
        if (userRole === 'DOCTOR') {
          return NextResponse.redirect(new URL('/dashboard-doctor', request.url));
        } else if (userRole === 'PHARMACIST') {
          return NextResponse.redirect(new URL('/pharmacyPage', request.url));
        } else if (userRole === 'RECEPTIONIST') {
          return NextResponse.redirect(new URL('/receptionistPage', request.url));
        } else if (userRole === 'PATIENT') {
          return NextResponse.redirect(new URL('/', request.url));
        } else {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
  }

  console.log('Proceeding with the request');
  return NextResponse.next();
}

// Cập nhật matcher để bao gồm cả route receptionistPage
export const config = {
  matcher: ['/login', '/dashboard-doctor/:path*', '/pharmacyPage/:path*', '/receptionistPage/:path*'],
};