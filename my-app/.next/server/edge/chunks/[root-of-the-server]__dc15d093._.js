(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__dc15d093._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/pharmacyPage', request.url));
        } else if (userRole === 'RECEPTIONIST') {
            console.log('Redirecting to receptionist page');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/receptionistPage', request.url));
        } else if (userRole === 'PATIENT') {
            console.log('Redirecting to home page for patient');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
        } else if (userRole === 'DOCTOR') {
            console.log('Redirecting to doctor dashboard');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/dashboard-doctor', request.url));
        } else {
            console.log('No specific role matched, using fallback redirect to home');
            // Fallback for any other roles or if role is not defined
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
        }
    }
    // Nếu chưa đăng nhập và cố truy cập các trang được bảo vệ
    if (!isAuthenticated && (isDashboardRoute || isPharmacyRoute || isReceptionistRoute)) {
        console.log('Unauthorized access attempt, redirecting to login');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
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
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/dashboard-doctor', request.url));
                } else if (userRole === 'PHARMACIST') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/pharmacyPage', request.url));
                } else if (userRole === 'RECEPTIONIST') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/receptionistPage', request.url));
                } else if (userRole === 'PATIENT') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
                } else {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
                }
            }
        }
    }
    console.log('Proceeding with the request');
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/login',
        '/dashboard-doctor/:path*',
        '/pharmacyPage/:path*',
        '/receptionistPage/:path*'
    ]
};
}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dc15d093._.js.map