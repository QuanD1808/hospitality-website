(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/pharmacyPage/PatientList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientList": ()=>PatientList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const PatientList = (param)=>{
    let { patients, onPatientSelect, onRefresh, isLoading = false, error = null } = param;
    _s();
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Function to handle manual refresh
    const handleRefresh = async ()=>{
        if (isRefreshing || isLoading) return;
        setIsRefreshing(true);
        try {
            if (onRefresh) {
                await onRefresh();
            }
        } catch (error) {
            console.error("Error refreshing patient list:", error);
        } finally{
            // Add a small delay for better UX
            setTimeout(()=>{
                setIsRefreshing(false);
            }, 800);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-600 px-4 py-3 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                className: "h-5 w-5 text-white mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-white",
                                children: "Danh Sách Chờ Phát Thuốc"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            patients.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium",
                                children: patients.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleRefresh,
                        className: "p-1.5 rounded-full text-white hover:bg-blue-700 transition-all focus:outline-none ".concat(isRefreshing ? 'animate-spin' : ''),
                        disabled: isRefreshing || isLoading,
                        title: "Làm mới danh sách",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "divide-y divide-gray-200 max-h-96 overflow-y-auto",
                children: isRefreshing || isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center p-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 24,
                                className: "animate-spin mx-auto text-blue-600 mb-2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: isRefreshing ? 'Đang cập nhật danh sách...' : 'Đang tải danh sách...'
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-full bg-red-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-6 w-6 text-red-600"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-600 font-medium",
                            children: "Không thể tải dữ liệu"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mt-2 mb-4",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRefresh,
                            className: "inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 16,
                                    className: "mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Thử lại"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : patients.length > 0 ? patients.map((patient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 hover:bg-gray-50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 rounded-full p-2 mr-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                className: "h-5 w-5 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                lineNumber: 93,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                            lineNumber: 92,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-900",
                                                            children: patient.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full",
                                                            children: patient.serialNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: patient.phone || 'Không có SĐT'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center text-xs text-blue-600 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Bác sĩ:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-1",
                                                            children: patient.doctor
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col mt-1",
                                                    children: [
                                                        patient.diagnosis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: "Chẩn đoán:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                                    lineNumber: 114,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-1 line-clamp-1",
                                                                    children: patient.diagnosis
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                                    lineNumber: 115,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        patient.prescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-xs text-green-600 mt-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    size: 12,
                                                                    className: "mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                                    lineNumber: 120,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        patient.prescription.length,
                                                                        " loại thuốc cần phát"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                            lineNumber: 95,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                    lineNumber: 91,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onPatientSelect(patient),
                                    className: "inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors",
                                    children: "Phát thuốc"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 90,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, patient.id, false, {
                        fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                className: "h-6 w-6 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 font-medium",
                            children: "Không có bệnh nhân nào trong danh sách chờ."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mt-1",
                            children: "Tất cả đơn thuốc đã được phát."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRefresh,
                            className: "mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 16,
                                    className: "mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Kiểm tra lại"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pharmacyPage/PatientList.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PatientList, "lgQq1N8Hon4xk1bBDe0UpRSySYU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PatientList;
var _c;
__turbopack_context__.k.register(_c, "PatientList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/Invoice.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Invoice": ()=>Invoice
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeftIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as PrinterIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarRange$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-range.js [app-client] (ecmascript) <export default as CalendarRange>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const Invoice = (param)=>{
    let { patient, onClose, onComplete } = param;
    var _revenueData_totalAmount, _revenueData_monthlyRevenue, _revenueData_yearlyRevenue;
    _s();
    const { token, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])(); // Get both token and user from auth context
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revenueData, setRevenueData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingRevenue, setIsLoadingRevenue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get the current user's name for the invoice
    const pharmacistName = (user === null || user === void 0 ? void 0 : user.fullName) || 'Chưa xác định';
    const currentDate = new Date().toLocaleDateString('vi-VN');
    // Tính tổng tiền từ dữ liệu trong client
    const calculateTotal = ()=>{
        return patient.prescription.reduce((total, med)=>{
            return total + med.price * med.quantity;
        }, 0);
    };
    // Lấy doanh thu từ API khi component được mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Invoice.useEffect": ()=>{
            const fetchRevenueData = {
                "Invoice.useEffect.fetchRevenueData": async ()=>{
                    if (!token || !patient.id) {
                        console.log("Missing token or patient ID, cannot fetch revenue data");
                        return;
                    }
                    setIsLoadingRevenue(true);
                    try {
                        console.log("Fetching revenue data for prescription ID: ".concat(patient.id));
                        // Gọi API để tính doanh thu từ đơn thuốc này
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePrescriptionRevenue"])(patient.id, token);
                        console.log("Revenue data from API:", data);
                        if (data && data.totalAmount !== undefined) {
                            setRevenueData(data);
                            console.log("Total revenue for this prescription: ".concat(data.totalAmount.toLocaleString('vi-VN'), " đ"));
                            if (data.monthlyRevenue) {
                                console.log("Monthly revenue: ".concat(data.monthlyRevenue.toLocaleString('vi-VN'), " đ"));
                            }
                            if (data.yearlyRevenue) {
                                console.log("Yearly revenue: ".concat(data.yearlyRevenue.toLocaleString('vi-VN'), " đ"));
                            }
                        } else {
                            console.warn("Revenue data is incomplete or undefined");
                        }
                    } catch (err) {
                        var _err_response;
                        console.error("Error fetching revenue data:", err);
                        console.error("Error details:", ((_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.data) || err.message);
                    } finally{
                        setIsLoadingRevenue(false);
                    }
                }
            }["Invoice.useEffect.fetchRevenueData"];
            fetchRevenueData();
        }
    }["Invoice.useEffect"], [
        patient.id,
        token
    ]);
    const handlePrint = async ()=>{
        setIsProcessing(true);
        setError(null);
        try {
            var _revenueData_totalAmount;
            console.log("Invoice: Starting print and complete process");
            // Trước khi hoàn tất, kiểm tra nếu chưa có dữ liệu doanh thu, thử lấy lại
            if (!revenueData && token) {
                console.log("Invoice: Fetching revenue data before completing...");
                try {
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePrescriptionRevenue"])(patient.id, token);
                    setRevenueData(data);
                    console.log("Revenue data retrieved:", data);
                } catch (revError) {
                    console.error("Could not retrieve revenue data:", revError);
                // Continue even if we can't get revenue data
                }
            }
            // Xác định tổng tiền từ API hoặc tính toán cục bộ
            const totalAmount = (revenueData === null || revenueData === void 0 ? void 0 : revenueData.totalAmount) || calculateTotal();
            // In ra thông tin cho biết chúng ta đang xử lý
            console.log("Invoice: Printing invoice for patient:", patient.fullName);
            console.log("Invoice: Patient ID:", patient.id);
            console.log("Invoice: Prescription ID:", patient.id); // In the pharmacy system, patient.id is actually the prescription ID
            console.log("Invoice: Total amount (from API):", (revenueData === null || revenueData === void 0 ? void 0 : (_revenueData_totalAmount = revenueData.totalAmount) === null || _revenueData_totalAmount === void 0 ? void 0 : _revenueData_totalAmount.toLocaleString('vi-VN')) || "Not available", "đ");
            console.log("Invoice: Total amount (calculated):", calculateTotal().toLocaleString('vi-VN'), "đ");
            console.log("Invoice: Medicines:", patient.prescription.length, "items");
            // Additional revenue information
            if (revenueData) {
                var _revenueData_monthlyRevenue, _revenueData_yearlyRevenue;
                console.log("Invoice: Monthly revenue:", ((_revenueData_monthlyRevenue = revenueData.monthlyRevenue) === null || _revenueData_monthlyRevenue === void 0 ? void 0 : _revenueData_monthlyRevenue.toLocaleString('vi-VN')) || "N/A", "đ");
                console.log("Invoice: Yearly revenue:", ((_revenueData_yearlyRevenue = revenueData.yearlyRevenue) === null || _revenueData_yearlyRevenue === void 0 ? void 0 : _revenueData_yearlyRevenue.toLocaleString('vi-VN')) || "N/A", "đ");
            }
            // Hiển thị thông tin chi tiết về mỗi loại thuốc
            patient.prescription.forEach((med, index)=>{
                var _revenueData_medicines;
                const apiMedicineData = revenueData === null || revenueData === void 0 ? void 0 : (_revenueData_medicines = revenueData.medicines) === null || _revenueData_medicines === void 0 ? void 0 : _revenueData_medicines.find((m)=>m.name === med.name);
                console.log("Invoice: Medicine ".concat(index + 1, ":"), {
                    name: med.name,
                    quantity: med.quantity,
                    price: med.price,
                    calculatedTotal: med.quantity * med.price,
                    apiTotal: (apiMedicineData === null || apiMedicineData === void 0 ? void 0 : apiMedicineData.total) || 'N/A'
                });
            });
            // Giả lập thời gian chờ để UX tốt hơn
            console.log("Invoice: Waiting 1 second before completing...");
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // Cập nhật trạng thái prescription thành DISPENSED
            console.log("Invoice: Now calling onComplete() to mark prescription as DISPENSED");
            // Gọi callback để thông báo cho component cha (handleComplete trong PatientDetails.tsx)
            if (typeof onComplete === 'function') {
                onComplete();
                console.log("Invoice: Called onComplete() successfully");
            } else {
                console.error("Invoice: onComplete is not a function!", onComplete);
                throw new Error("Lỗi kết nối: onComplete không phải là một hàm");
            }
            console.log("Invoice: Process completed successfully");
            // Trong môi trường thực tế, đây là nơi có thể hiển thị thông báo thành công
            // hoặc chuyển hướng người dùng đến danh sách bệnh nhân
            // Thông báo trực quan cho người dùng biết đang xử lý
            alert("Hóa đơn đã được xử lý thành công!\nTrạng thái đơn thuốc đã được cập nhật thành 'DISPENSED'.");
        // Thực hiện yêu cầu in thực tế nếu cần
        // window.print(); // Uncomment để cho phép in hóa đơn thực tế
        } catch (err) {
            console.error("Error completing invoice:", err);
            setError(err.message || "Không thể hoàn tất hóa đơn. Vui lòng thử lại.");
        } finally{
            setIsProcessing(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-600 px-4 py-3 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "mr-2 text-white hover:text-blue-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__["ArrowLeftIcon"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-black bg-white px-2 py-1 rounded-md",
                                children: "Hóa Đơn Thuốc"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-4 w-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePrint,
                        disabled: isProcessing,
                        className: "inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md transition-colors ".concat(isProcessing ? 'bg-gray-400 text-white cursor-not-allowed' : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'),
                        children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Đang xử lý..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterIcon$3e$__["PrinterIcon"], {
                                    className: "h-4 w-4 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                " In & hoàn tất"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-gray-200 rounded-lg p-6 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-black",
                                    children: "PHÒNG KHÁM ĐA KHOA"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-black",
                                    children: "123 Nguyễn Huệ, Quận 1, TP.HCM"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-black",
                                    children: "Điện thoại: (028) 3822 1234"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 border-t pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-black",
                                            children: "HÓA ĐƠN THUỐC"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: [
                                                "Ngày: ",
                                                currentDate
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isLoadingRevenue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-blue-500 text-xs mt-1",
                                            children: "Đang tính toán doanh thu..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Họ và tên bệnh nhân"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.fullName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Số điện thoại"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.phone
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Mã đơn thuốc"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.serialNumber
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Chẩn đoán"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.diagnosis
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Bác sĩ kê đơn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.doctor
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 230,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Nhân viên phát thuốc"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: pharmacistName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full divide-y divide-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "STT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "Tên thuốc"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "Số lượng"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "Liều dùng"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "Đơn giá"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider",
                                                    children: "Thành tiền"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "bg-white divide-y divide-gray-200",
                                        children: [
                                            patient.prescription.map((medicine, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: index + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: medicine.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: medicine.quantity
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 269,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: medicine.dosage
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: [
                                                                medicine.price.toLocaleString('vi-VN'),
                                                                " đ"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                            children: [
                                                                (medicine.price * medicine.quantity).toLocaleString('vi-VN'),
                                                                ' ',
                                                                "đ"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 90
                                                }, ("TURBOPACK compile-time value", void 0))),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-end",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                    className: "w-4 h-4 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Tổng cộng:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-black",
                                                        children: [
                                                            (revenueData === null || revenueData === void 0 ? void 0 : revenueData.totalAmount) ? revenueData.totalAmount.toLocaleString('vi-VN') : calculateTotal().toLocaleString('vi-VN'),
                                                            " đ"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            (revenueData === null || revenueData === void 0 ? void 0 : revenueData.monthlyRevenue) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "bg-blue-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-end",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$range$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarRange$3e$__["CalendarRange"], {
                                                                    className: "w-4 h-4 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 300,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Doanh thu tháng này:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 301,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800",
                                                        children: [
                                                            revenueData.monthlyRevenue.toLocaleString('vi-VN'),
                                                            " đ"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            (revenueData === null || revenueData === void 0 ? void 0 : revenueData.yearlyRevenue) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "bg-green-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-end",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                                    className: "w-4 h-4 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Doanh thu năm nay:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800",
                                                        children: [
                                                            revenueData.yearlyRevenue.toLocaleString('vi-VN'),
                                                            " đ"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        revenueData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 p-4 border border-blue-200 rounded-lg bg-blue-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-medium text-blue-800 mb-2 flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                            className: "h-5 w-5 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Thông tin doanh thu"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-800",
                                                    children: "Doanh thu từ đơn thuốc này:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-bold text-blue-900",
                                                    children: [
                                                        ((_revenueData_totalAmount = revenueData.totalAmount) === null || _revenueData_totalAmount === void 0 ? void 0 : _revenueData_totalAmount.toLocaleString('vi-VN')) || '0',
                                                        " đ"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        revenueData.monthlyRevenue !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-800",
                                                    children: "Doanh thu trong tháng:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-bold text-blue-900",
                                                    children: [
                                                        ((_revenueData_monthlyRevenue = revenueData.monthlyRevenue) === null || _revenueData_monthlyRevenue === void 0 ? void 0 : _revenueData_monthlyRevenue.toLocaleString('vi-VN')) || '0',
                                                        " đ"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 336,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        revenueData.yearlyRevenue !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-800",
                                                    children: "Doanh thu trong năm:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-bold text-blue-900",
                                                    children: [
                                                        ((_revenueData_yearlyRevenue = revenueData.yearlyRevenue) === null || _revenueData_yearlyRevenue === void 0 ? void 0 : _revenueData_yearlyRevenue.toLocaleString('vi-VN')) || '0',
                                                        " đ"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 342,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                revenueData.medicines && revenueData.medicines.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t border-blue-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-blue-800 mb-2",
                                            children: "Phân tích chi tiết:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 352,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                                            children: revenueData.medicines.map((med, idx)=>{
                                                var _med_price, _med_total;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs bg-white p-2 rounded border border-blue-100 flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-700",
                                                            children: [
                                                                med.name,
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-500",
                                                                    children: [
                                                                        "(",
                                                                        med.quantity,
                                                                        " x ",
                                                                        (_med_price = med.price) === null || _med_price === void 0 ? void 0 : _med_price.toLocaleString('vi-VN'),
                                                                        "đ)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                                    lineNumber: 356,
                                                                    columnNumber: 68
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-blue-700",
                                                            children: [
                                                                (_med_total = med.total) === null || _med_total === void 0 ? void 0 : _med_total.toLocaleString('vi-VN'),
                                                                "đ"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 351,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        isLoadingRevenue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 p-4 border border-blue-100 rounded-lg bg-blue-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                        lineNumber: 369,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-blue-600",
                                        children: "Đang tính toán doanh thu..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4 mt-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-black",
                                            children: "Người lập phiếu"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black text-sm",
                                            children: "(Ký, ghi rõ họ tên)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 378,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: pharmacistName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 380,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-black",
                                            children: "Người nhận thuốc"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 383,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black text-sm",
                                            children: "(Ký, ghi rõ họ tên)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 385,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-black",
                                            children: patient.fullName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                            lineNumber: 386,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pharmacyPage/Invoice.tsx",
        lineNumber: 159,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Invoice, "6gDqvPkmOuBHhJlWa3HxJgWaLEg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Invoice;
var _c;
__turbopack_context__.k.register(_c, "Invoice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Dữ liệu được fetched từ API thay vì dùng static data
__turbopack_context__.s({
    "addQueue": ()=>addQueue,
    "deleteQueue": ()=>deleteQueue,
    "fetchInvoices": ()=>fetchInvoices,
    "fetchMedicines": ()=>fetchMedicines,
    "fetchPrescriptionDetails": ()=>fetchPrescriptionDetails,
    "fetchPrescriptions": ()=>fetchPrescriptions,
    "fetchQueues": ()=>fetchQueues,
    "fetchUsers": ()=>fetchUsers,
    "fetchUsersAlternative": ()=>fetchUsersAlternative,
    "generateMongoId": ()=>generateMongoId,
    "getAllDoctors": ()=>getAllDoctors,
    "getAllInvoices": ()=>getAllInvoices,
    "getAllMedicines": ()=>getAllMedicines,
    "getAllPatients": ()=>getAllPatients,
    "getAllPrescriptionDetails": ()=>getAllPrescriptionDetails,
    "getAllPrescriptions": ()=>getAllPrescriptions,
    "getAllQueues": ()=>getAllQueues,
    "getAllQueuesWithPatientInfo": ()=>getAllQueuesWithPatientInfo,
    "getAllUsers": ()=>getAllUsers,
    "getAuthToken": ()=>getAuthToken,
    "getInvoiceById": ()=>getInvoiceById,
    "getInvoiceByPrescriptionId": ()=>getInvoiceByPrescriptionId,
    "getInvoicesByPatientId": ()=>getInvoicesByPatientId,
    "getInvoicesByStatus": ()=>getInvoicesByStatus,
    "getMedicineById": ()=>getMedicineById,
    "getMedicinesForPrescription": ()=>getMedicinesForPrescription,
    "getPatientFullPrescriptionDetails": ()=>getPatientFullPrescriptionDetails,
    "getPrescriptionById": ()=>getPrescriptionById,
    "getPrescriptionDetailsByPrescriptionId": ()=>getPrescriptionDetailsByPrescriptionId,
    "getPrescriptionsByDoctorId": ()=>getPrescriptionsByDoctorId,
    "getPrescriptionsByPatientId": ()=>getPrescriptionsByPatientId,
    "getPrescriptionsByStatus": ()=>getPrescriptionsByStatus,
    "getQueueByPatientId": ()=>getQueueByPatientId,
    "getQueuesByStatus": ()=>getQueuesByStatus,
    "getUserById": ()=>getUserById,
    "getUsersByRole": ()=>getUsersByRole,
    "getWaitingPatients": ()=>getWaitingPatients,
    "initializeData": ()=>initializeData,
    "mockInvoices": ()=>mockInvoices,
    "mockMedicines": ()=>mockMedicines,
    "mockPatients": ()=>mockPatients,
    "mockPrescriptionDetails": ()=>mockPrescriptionDetails,
    "mockPrescriptions": ()=>mockPrescriptions,
    "mockQueues": ()=>mockQueues,
    "mockUsers": ()=>mockUsers,
    "reloadData": ()=>reloadData,
    "searchMedicines": ()=>searchMedicines,
    "searchUsers": ()=>searchUsers,
    "sendQueueToDoctor": ()=>sendQueueToDoctor,
    "setAuthToken": ()=>setAuthToken,
    "updateQueueStatus": ()=>updateQueueStatus
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/axios.customize.service.ts [app-client] (ecmascript)");
;
let mockUsers = [];
let mockQueues = [];
let mockMedicines = [];
let mockPrescriptions = [];
let mockPrescriptionDetails = [];
let mockInvoices = [];
// Biến toàn cục để lưu token xác thực
let authToken = null;
const setAuthToken = (token)=>{
    authToken = token;
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('authToken', token); // Lưu token vào localStorage để giữ qua refresh
    }
};
const getAuthToken = ()=>{
    // Nếu không có token trong memory, thử lấy từ localStorage
    if (!authToken && "object" !== 'undefined') {
        authToken = localStorage.getItem('authToken');
    }
    return authToken;
};
// Helper function để thực hiện API call có xác thực
const authenticatedGet = async (endpoint)=>{
    try {
        // Lấy token từ localStorage hoặc cookies
        let token = getAuthToken();
        // Thử lấy token từ cookies nếu không tìm thấy trong localStorage
        if (!token && typeof document !== 'undefined') {
            // Check browser cookies if localStorage doesn't have the token
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find((c)=>c.trim().startsWith('token='));
            if (tokenCookie) {
                token = tokenCookie.split('=')[1];
                console.log("Found token in cookies, using it for API calls");
                // Lưu lại vào authToken để sử dụng cho các lần sau
                setAuthToken(token);
            }
        }
        if (!token) {
            console.warn('No authentication token available for API call to:', endpoint);
            console.warn('Please login first or check token storage.');
            return null;
        }
        console.log("Making authenticated request to ".concat(endpoint));
        console.log("Using token (first 10 chars): ".concat(token.substring(0, 10), "..."));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(endpoint, {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
        console.log("Successful response from ".concat(endpoint, ":"), response.status);
        if (Array.isArray(response.data)) {
            console.log("Got ".concat(response.data.length, " items from ").concat(endpoint));
        } else {
            console.log("Got data from ".concat(endpoint, ":"), response.data ? 'Object returned' : 'Empty response');
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching from ".concat(endpoint, ":"), error.message);
        // Log more detailed error info
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            if (error.response.status === 403) {
                console.error("Access forbidden to ".concat(endpoint, " - check user permissions"));
            } else if (error.response.status === 401) {
                console.error("Unauthorized access to ".concat(endpoint, " - token may be expired"));
                // Thử xóa token để người dùng phải đăng nhập lại
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.removeItem('authToken');
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    authToken = null;
                }
            }
        } else if (error.request) {
            console.error('No response received from request. Server may be down.');
        } else {
            console.error('Error setting up request:', error.message);
        }
        return null;
    }
};
const fetchUsers = async ()=>{
    console.log('Fetching users from API...');
    // Đầu tiên thử lấy thông tin user hiện tại để biết role
    try {
        const currentUser = await authenticatedGet('/users/me');
        if (currentUser) {
            console.log("Current user role: ".concat(currentUser.role));
            if (currentUser.role === 'ADMIN') {
                // Nếu là ADMIN, có quyền lấy tất cả users
                console.log('User is ADMIN, trying to fetch all users');
                const data = await authenticatedGet('/users');
                if (data && Array.isArray(data)) {
                    console.log("Successfully fetched ".concat(data.length, " users from API"));
                    mockUsers = data;
                    return data;
                }
            }
            // Dù là role nào, thử dùng endpoint mới để lấy danh sách bệnh nhân
            if ([
                'ADMIN',
                'DOCTOR',
                'PHARMACIST',
                'RECEPTIONIST'
            ].includes(currentUser.role)) {
                console.log("Trying to fetch patients using /users/patients endpoint for ".concat(currentUser.role));
                const patients = await authenticatedGet('/users/patients');
                if (patients && Array.isArray(patients)) {
                    console.log("Successfully fetched ".concat(patients.length, " patients from API"));
                    // Kết hợp với dữ liệu hiện có (nếu có)
                    // Giữ lại các user không phải bệnh nhân từ danh sách hiện có (nếu có)
                    const nonPatients = mockUsers.filter((user)=>user.role !== 'PATIENT');
                    mockUsers = [
                        ...nonPatients,
                        ...patients
                    ];
                    console.log("Combined user data: ".concat(mockUsers.length, " users (").concat(nonPatients.length, " non-patients + ").concat(patients.length, " patients)"));
                    return mockUsers;
                }
            }
            // Nếu không thể lấy dữ liệu, giữ nguyên dữ liệu mockUsers hiện tại
            console.log("Using existing mock data with ".concat(mockUsers.length, " users"));
            return [
                ...mockUsers
            ];
        } else {
            console.error('Could not fetch current user info, authentication may be invalid');
            return mockUsers;
        }
    } catch (error) {
        console.error('Error in fetchUsers:', error);
        return mockUsers;
    }
};
const fetchQueues = async ()=>{
    const data = await authenticatedGet('/queues');
    if (data && Array.isArray(data)) {
        mockQueues = data;
        return data;
    }
    return [];
};
const fetchMedicines = async ()=>{
    const data = await authenticatedGet('/medicines');
    if (data && Array.isArray(data)) {
        mockMedicines = data;
        return data;
    }
    return [];
};
const fetchPrescriptions = async ()=>{
    const data = await authenticatedGet('/prescriptions');
    if (data && Array.isArray(data)) {
        mockPrescriptions = data;
        return data;
    }
    return [];
};
const fetchPrescriptionDetails = async ()=>{
    const data = await authenticatedGet('/prescription-details');
    if (data && Array.isArray(data)) {
        mockPrescriptionDetails = data;
        return data;
    }
    return [];
};
const fetchInvoices = async ()=>{
    const data = await authenticatedGet('/invoices');
    if (data && Array.isArray(data)) {
        mockInvoices = data;
        return data;
    }
    return [];
};
const initializeData = async ()=>{
    console.log('Initializing data from API or mock sources...');
    try {
        // Check if we have a valid token first
        const token = getAuthToken();
        if (!token) {
            console.warn('No authentication token found, will use existing mock data');
            return false;
        }
        // Try to validate token
        try {
            console.log('Validating token before fetching data...');
            const currentUser = await authenticatedGet('/users/me');
            if (!currentUser) {
                console.error('Token validation failed, cannot fetch data');
                return false;
            }
            console.log("Token valid, logged in as ".concat(currentUser.username, " (").concat(currentUser.role, ")"));
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
        // Initialize with separate try/catch for each resource type
        // This allows some data to load even if others fail
        const results = {
            users: false,
            queues: false,
            medicines: false,
            prescriptions: false,
            prescriptionDetails: false,
            invoices: false
        };
        try {
            await fetchUsers();
            results.users = true;
            console.log("Users loaded: ".concat(mockUsers.length, " items"));
        } catch (error) {
            console.error('Error loading users:', error);
        }
        try {
            await fetchQueues();
            results.queues = true;
            console.log("Queues loaded: ".concat(mockQueues.length, " items"));
        } catch (error) {
            console.error('Error loading queues:', error);
        }
        try {
            await fetchMedicines();
            results.medicines = true;
            console.log("Medicines loaded: ".concat(mockMedicines.length, " items"));
        } catch (error) {
            console.error('Error loading medicines:', error);
        }
        try {
            await fetchPrescriptions();
            results.prescriptions = true;
            console.log("Prescriptions loaded: ".concat(mockPrescriptions.length, " items"));
        } catch (error) {
            console.error('Error loading prescriptions:', error);
        }
        try {
            await fetchPrescriptionDetails();
            results.prescriptionDetails = true;
            console.log("Prescription details loaded: ".concat(mockPrescriptionDetails.length, " items"));
        } catch (error) {
            console.error('Error loading prescription details:', error);
        }
        try {
            await fetchInvoices();
            results.invoices = true;
            console.log("Invoices loaded: ".concat(mockInvoices.length, " items"));
        } catch (error) {
            console.error('Error loading invoices:', error);
        }
        const successCount = Object.values(results).filter(Boolean).length;
        console.log("Data initialization complete: ".concat(successCount, "/6 resource types loaded successfully"));
        return successCount > 0;
    } catch (error) {
        console.error('Error in data initialization:', error);
        return false;
    }
};
const getAllUsers = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return [
        ...mockUsers
    ];
};
const getUserById = async (id)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.find((user)=>user._id === id);
};
const getUsersByRole = async (role)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === role);
};
const searchUsers = async (searchTerm)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    const term = searchTerm.toLowerCase();
    return mockUsers.filter((user)=>user.fullName.toLowerCase().includes(term) || user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.phone.includes(term) || user.userId.includes(term));
};
const getAllQueues = async ()=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return [
        ...mockQueues
    ];
};
const getQueuesByStatus = async (status)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return mockQueues.filter((queue)=>queue.status === status);
};
const getQueueByPatientId = async (patientId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return mockQueues.find((queue)=>queue.patient === patientId);
};
const addQueue = async function(patientId) {
    let status = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'waiting';
    // Kiểm tra xem patientId có tồn tại và là bệnh nhân không
    const patient = await getUserById(patientId);
    if (!patient || patient.role !== 'PATIENT') {
        console.error('Invalid patient ID or user is not a patient');
        return null;
    }
    // Kiểm tra xem bệnh nhân đã có trong queue chưa
    const existingQueue = await getQueueByPatientId(patientId);
    if (existingQueue) {
        console.warn('Patient already in queue');
        return existingQueue;
    }
    // Tạo queue mới
    const newQueue = {
        _id: generateMongoId(),
        patient: patientId,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
    };
    // Gọi API để tạo queue thực sự qua API
    try {
        // Đây là phần sẽ gọi API thực tế
        // const response = await axiosInstance.post('/queues', newQueue, {
        //   headers: { Authorization: `Bearer ${getAuthToken()}` }
        // });
        // if (response.data) {
        //   mockQueues.push(response.data);
        //   return response.data;
        // }
        // Hiện tại, chúng ta chỉ thêm vào cache
        mockQueues.push(newQueue);
        return newQueue;
    } catch (error) {
        console.error('Error creating queue:', error);
        return null;
    }
};
const updateQueueStatus = async (queueId, status, doctorId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
    if (index !== -1) {
        const updatedQueue = {
            ...mockQueues[index],
            status: status,
            updatedAt: new Date().toISOString()
        };
        if (doctorId && status === 'in_progress') {
            updatedQueue.doctorId = doctorId;
        }
        // Thực tế sẽ gọi API để cập nhật queue
        // const response = await axiosInstance.put(`/queues/${queueId}`, updatedQueue, {
        //   headers: { Authorization: `Bearer ${getAuthToken()}` }
        // });
        // Hiện tại chỉ cập nhật trong cache
        mockQueues[index] = updatedQueue;
        return mockQueues[index];
    }
    return null;
};
const deleteQueue = async (queueId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
    if (index !== -1) {
        const deletedQueue = mockQueues[index];
        // Thực tế sẽ gọi API để xóa queue
        // await axiosInstance.delete(`/queues/${queueId}`, {
        //   headers: { Authorization: `Bearer ${getAuthToken()}` }
        // });
        // Hiện tại chỉ xóa trong cache
        mockQueues.splice(index, 1);
        return deletedQueue;
    }
    return null;
};
const getAllMedicines = async ()=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    return [
        ...mockMedicines
    ];
};
const getMedicineById = async (id)=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    return mockMedicines.find((medicine)=>medicine._id === id);
};
const searchMedicines = async (searchTerm)=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    const term = searchTerm.toLowerCase();
    return mockMedicines.filter((medicine)=>medicine.name.toLowerCase().includes(term) || medicine.customMedicineId.toLowerCase().includes(term));
};
const getAllPrescriptions = async ()=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return [
        ...mockPrescriptions
    ];
};
const getPrescriptionById = async (id)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.find((prescription)=>prescription._id === id);
};
const getPrescriptionsByPatientId = async (patientId)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.patientId === patientId);
};
const getPrescriptionsByDoctorId = async (doctorId)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.doctorId === doctorId);
};
const getPrescriptionsByStatus = async (status)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.status === status);
};
const getAllPrescriptionDetails = async ()=>{
    if (mockPrescriptionDetails.length === 0) {
        await fetchPrescriptionDetails();
    }
    return [
        ...mockPrescriptionDetails
    ];
};
const getPrescriptionDetailsByPrescriptionId = async (prescriptionId)=>{
    if (mockPrescriptionDetails.length === 0) {
        await fetchPrescriptionDetails();
    }
    return mockPrescriptionDetails.filter((detail)=>detail.prescriptionId === prescriptionId);
};
const getMedicinesForPrescription = async (prescriptionId)=>{
    const details = await getPrescriptionDetailsByPrescriptionId(prescriptionId);
    const result = [];
    for (const detail of details){
        const medicine = await getMedicineById(detail.medicineId);
        result.push({
            ...detail,
            medicine: medicine || null
        });
    }
    return result;
};
const getAllInvoices = async ()=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return [
        ...mockInvoices
    ];
};
const getInvoiceById = async (id)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.find((invoice)=>invoice._id === id);
};
const getInvoiceByPrescriptionId = async (prescriptionId)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.find((invoice)=>invoice.prescriptionId === prescriptionId);
};
const getInvoicesByPatientId = async (patientId)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.filter((invoice)=>invoice.patientId === patientId);
};
const getInvoicesByStatus = async (status)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.filter((invoice)=>invoice.status === status);
};
const getPatientFullPrescriptionDetails = async (patientId)=>{
    const prescriptions = await getPrescriptionsByPatientId(patientId);
    const result = [];
    for (const prescription of prescriptions){
        // Lấy thông tin bác sĩ
        const doctor = await getUserById(prescription.doctorId);
        // Lấy chi tiết đơn thuốc và thông tin thuốc
        const details = await getPrescriptionDetailsByPrescriptionId(prescription._id);
        const medicineDetails = [];
        for (const detail of details){
            const medicine = await getMedicineById(detail.medicineId);
            medicineDetails.push({
                ...detail,
                medicineName: medicine ? medicine.name : 'Unknown',
                medicinePrice: medicine ? medicine.price : 0
            });
        }
        // Lấy hóa đơn nếu có
        const invoice = await getInvoiceByPrescriptionId(prescription._id);
        result.push({
            ...prescription,
            doctorName: doctor ? doctor.fullName : 'Unknown',
            details: medicineDetails,
            invoice: invoice || null
        });
    }
    return result;
};
const getAllPatients = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === 'PATIENT');
};
const getAllDoctors = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === 'DOCTOR');
};
const mockPatients = getAllPatients;
const getWaitingPatients = async ()=>{
    const waitingQueues = await getQueuesByStatus('waiting');
    const result = [];
    for (const queue of waitingQueues){
        const patient = await getUserById(queue.patient);
        result.push({
            queueInfo: queue,
            patientInfo: patient || null
        });
    }
    return result;
};
const getAllQueuesWithPatientInfo = async ()=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const result = [];
    for (const queue of mockQueues){
        const patient = await getUserById(queue.patient);
        result.push({
            ...queue,
            patientInfo: patient || null
        });
    }
    return result;
};
const generateMongoId = ()=>{
    // MongoDB ObjectId format: 24 hex characters
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const randomPart = Array(16).fill(0).map(()=>Math.floor(Math.random() * 16).toString(16)).join('');
    return timestamp + randomPart;
};
const reloadData = async (dataTypes)=>{
    if (!dataTypes || dataTypes.length === 0) {
        // Reload tất cả
        return await initializeData();
    }
    const promises = [];
    if (dataTypes.includes('users')) promises.push(fetchUsers());
    if (dataTypes.includes('queues')) promises.push(fetchQueues());
    if (dataTypes.includes('medicines')) promises.push(fetchMedicines());
    if (dataTypes.includes('prescriptions')) promises.push(fetchPrescriptions());
    if (dataTypes.includes('prescriptionDetails')) promises.push(fetchPrescriptionDetails());
    if (dataTypes.includes('invoices')) promises.push(fetchInvoices());
    await Promise.all(promises);
    return {
        users: mockUsers.length,
        queues: mockQueues.length,
        medicines: mockMedicines.length,
        prescriptions: mockPrescriptions.length,
        prescriptionDetails: mockPrescriptionDetails.length,
        invoices: mockInvoices.length
    };
};
const fetchUsersAlternative = async ()=>{
    console.log('Trying alternative method to fetch users...');
    try {
        // Thử lấy thông tin người dùng hiện tại (me endpoint)
        const currentUser = await authenticatedGet('/users/me');
        if (!currentUser) {
            console.warn('Could not fetch current user');
            return [];
        }
        console.log('Current user retrieved:', currentUser.role);
        if (currentUser.role === 'ADMIN') {
            // Nếu là admin, thử lại với endpoint /users
            return await fetchUsers();
        }
        // Không phải admin, phải dùng cách khác
        // 1. Nếu là bác sĩ, có thể lấy danh sách bệnh nhân được chỉ định
        // 2. Nếu là receptionist, thử lấy dữ liệu theo cách khác
        // Endpoint hoặc API call thích hợp theo role
        // Ví dụ: const patients = await authenticatedGet('/appointments/patients');
        // Tạm thời giữ nguyên dữ liệu hiện tại nếu có
        return mockUsers.length > 0 ? mockUsers : [];
    } catch (error) {
        console.error('Alternative user fetch failed:', error);
        return [];
    }
};
const sendQueueToDoctor = async (queueId)=>{
    try {
        // Lấy thông tin queue
        const queue = mockQueues.find((q)=>q._id === queueId);
        if (!queue) {
            console.error("Queue with ID ".concat(queueId, " not found."));
            return null;
        }
        // Kiểm tra xem queue đã được gán cho bác sĩ chưa
        if (!queue.doctorId) {
            console.error("Queue ".concat(queueId, " has no assigned doctor."));
            return null;
        }
        // Trong môi trường thực tế, tại đây sẽ có logic gửi thông báo đến bác sĩ
        // Trong mock data, ta chỉ cần đảm bảo trạng thái là in_progress
        if (queue.status !== 'in_progress') {
            queue.status = 'in_progress';
            queue.updatedAt = new Date().toISOString();
        }
        console.log("Mock: Queue ".concat(queueId, " information sent to doctor ").concat(queue.doctorId));
        return queue;
    } catch (error) {
        console.error('Error sending queue information to doctor:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/pharmacyUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createPharmacyInvoice": ()=>createPharmacyInvoice,
    "getDailyRevenue": ()=>getDailyRevenue,
    "getPatientsWithPendingPrescriptions": ()=>getPatientsWithPendingPrescriptions,
    "getPharmacyInvoices": ()=>getPharmacyInvoices,
    "getYearlyRevenue": ()=>getYearlyRevenue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
;
;
// Helper function to extract medicine ID properly
const extractMedicineId = (medicineId)=>{
    if (typeof medicineId === 'object' && medicineId !== null) {
        return medicineId._id || medicineId.id || '';
    }
    return medicineId || '';
};
const getPatientsWithPendingPrescriptions = async ()=>{
    try {
        // Try to get authentication token from localStorage
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            try {
                console.log('Fetching pending prescriptions with status PENDING_DISPENSE from API');
                // If we have a token, try to use the real API
                const prescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({
                    status: 'PENDING_DISPENSE'
                }, tokenFromStorage);
                console.log("Fetched ".concat(prescriptions.length, " prescriptions with status PENDING_DISPENSE"));
                const result = [];
                for (const prescription of prescriptions){
                    // The API already populates patientId and doctorId
                    const patient = prescription.patientId;
                    const doctor = prescription.doctorId;
                    if (!patient || !doctor) {
                        console.warn("Prescription ".concat(prescription._id, " is missing patient or doctor data, skipping"));
                        continue;
                    }
                    try {
                        // Get prescription details
                        console.log("Fetching prescription details for prescription ID: ".concat(prescription._id));
                        const prescriptionDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionDetails"](prescription._id, tokenFromStorage);
                        console.log("Fetched ".concat(prescriptionDetails.length, " prescription details"));
                        // Map prescription details to medicines
                        const medicines = [];
                        for (const detail of prescriptionDetails){
                            // We need to get medicine details for each prescription detail
                            try {
                                // Extract medicine ID properly
                                const medicineId = extractMedicineId(detail.medicineId);
                                console.log("Getting medicine details for ID: ".concat(medicineId));
                                const medicine = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMedicineById"](medicineId, tokenFromStorage);
                                medicines.push({
                                    name: (medicine === null || medicine === void 0 ? void 0 : medicine.name) || 'Unknown',
                                    quantity: detail.quantity,
                                    dosage: detail.dosage,
                                    price: (medicine === null || medicine === void 0 ? void 0 : medicine.price) || 0
                                });
                            } catch (medError) {
                                console.warn("Error fetching medicine from API, falling back to mock data:", medError);
                                // If we can't get the medicine from API, use mock data
                                // Extract medicine ID properly for mock data too
                                const medicineId = extractMedicineId(detail.medicineId);
                                const mockMedicine = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMedicineById"])(medicineId);
                                medicines.push({
                                    name: (mockMedicine === null || mockMedicine === void 0 ? void 0 : mockMedicine.name) || 'Unknown',
                                    quantity: detail.quantity,
                                    dosage: detail.dosage,
                                    price: (mockMedicine === null || mockMedicine === void 0 ? void 0 : mockMedicine.price) || 0
                                });
                            }
                        }
                        result.push({
                            id: prescription._id,
                            serialNumber: prescription.customPrescriptionId,
                            fullName: (patient === null || patient === void 0 ? void 0 : patient.fullName) || 'Unknown',
                            phone: (patient === null || patient === void 0 ? void 0 : patient.phone) || 'N/A',
                            diagnosis: prescription.diagnosis,
                            doctor: (doctor === null || doctor === void 0 ? void 0 : doctor.fullName) || 'Không xác định',
                            prescription: medicines
                        });
                    } catch (detailsError) {
                        console.error("Error fetching prescription details for prescription ".concat(prescription._id, ":"), detailsError);
                    }
                }
                console.log("Prepared ".concat(result.length, " pharmacy patients with their prescription details"));
                return result;
            } catch (apiError) {
                console.error("API error, falling back to mock data:", apiError);
                // Fall back to mock data if API fails
                return fetchMockPendingPrescriptions();
            }
        } else {
            console.log("No authentication token found, using mock data");
            // If no token, use mock data
            return fetchMockPendingPrescriptions();
        }
    } catch (error) {
        console.error("Error fetching pending prescriptions:", error);
        return [];
    }
};
// Separate function for fetching mock data
const fetchMockPendingPrescriptions = async ()=>{
    console.log('Fetching pending prescriptions from mock data');
    // Initialize mock data if needed
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeData"])();
    const pendingPrescriptions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionsByStatus"])('PENDING_DISPENSE');
    console.log("Fetched ".concat(pendingPrescriptions.length, " mock prescriptions with status PENDING_DISPENSE"));
    const result = [];
    for (const prescription of pendingPrescriptions){
        try {
            // Get patient details
            const patient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(prescription.patientId);
            if (!patient) {
                console.warn("Mock patient with ID ".concat(prescription.patientId, " not found for prescription ").concat(prescription._id));
                continue;
            }
            // Get doctor details
            const doctor = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(prescription.doctorId);
            if (!doctor) {
                console.warn("Mock doctor with ID ".concat(prescription.doctorId, " not found for prescription ").concat(prescription._id));
                continue;
            }
            // Get prescription details
            const prescriptionDetails = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionDetailsByPrescriptionId"])(prescription._id);
            console.log("Found ".concat(prescriptionDetails.length, " mock prescription details for prescription ").concat(prescription._id));
            // Map prescription details to medicines
            const medicines = [];
            for (const detail of prescriptionDetails){
                try {
                    // Extract medicine ID properly
                    const medicineId = extractMedicineId(detail.medicineId);
                    console.log("Getting mock medicine details for ID: ".concat(medicineId));
                    const medicine = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMedicineById"])(medicineId);
                    if (!medicine) {
                        console.warn("Mock medicine with ID ".concat(medicineId, " not found"));
                        medicines.push({
                            name: 'Unknown Medicine',
                            quantity: detail.quantity,
                            dosage: detail.dosage,
                            price: 0
                        });
                        continue;
                    }
                    medicines.push({
                        name: medicine.name,
                        quantity: detail.quantity,
                        dosage: detail.dosage,
                        price: medicine.price
                    });
                } catch (medError) {
                    console.error("Error processing mock medicine:", medError);
                    medicines.push({
                        name: 'Error Loading Medicine',
                        quantity: detail.quantity,
                        dosage: detail.dosage,
                        price: 0
                    });
                }
            }
            result.push({
                id: prescription._id,
                serialNumber: prescription.customPrescriptionId,
                fullName: patient.fullName,
                phone: patient.phone || 'N/A',
                diagnosis: prescription.diagnosis,
                doctor: doctor.fullName || 'Không xác định',
                prescription: medicines
            });
        } catch (error) {
            console.error("Error processing mock prescription ".concat(prescription._id, ":"), error);
        }
    }
    console.log("Prepared ".concat(result.length, " pharmacy patients from mock data"));
    return result;
};
const getPharmacyInvoices = async ()=>{
    try {
        const invoices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllInvoices"])();
        const result = [];
        for (const invoice of invoices){
            // Get pharmacist information (default to a specific ID if needed)
            const pharmacist = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])('685face13fc4c04e1bd96c0a'); // Default pharmacist ID
            // Return formatted invoice data
            result.push({
                id: invoice._id,
                date: invoice.createdAt,
                patientId: invoice.patientId,
                pharmacistName: (pharmacist === null || pharmacist === void 0 ? void 0 : pharmacist.fullName) || 'Nhân viên phát thuốc',
                totalAmount: invoice.totalAmount
            });
        }
        return result;
    } catch (error) {
        console.error("Error fetching pharmacy invoices:", error);
        return [];
    }
};
const getDailyRevenue = async ()=>{
    try {
        const today = new Date();
        const result = [];
        // Try to get authentication token from localStorage
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            console.log('Using API to get daily revenue data');
            try {
                // Get data for the last 7 days using API
                for(let i = 0; i < 7; i++){
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    const dateString = date.toISOString().split('T')[0];
                    // Get start and end of the day
                    const startDate = dateString;
                    const endDate = dateString;
                    // Use API to get revenue for this day
                    const dailyData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRevenue"](tokenFromStorage, startDate, endDate);
                    result.push({
                        date: dateString,
                        amount: dailyData.totalAmount || 0
                    });
                }
            } catch (apiError) {
                console.error('Error fetching daily revenue from API, falling back to mock data:', apiError);
                // Fall back to mock data if API fails
                return getDailyRevenueMock();
            }
        } else {
            console.log('No auth token, using mock data for daily revenue');
            // No token, use mock data
            return getDailyRevenueMock();
        }
        // Sort by date ascending for easier chart rendering
        return result.sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error("Error getting daily revenue:", error);
        return [];
    }
};
// Mock function for daily revenue when API is not available
const getDailyRevenueMock = async ()=>{
    try {
        const today = new Date();
        const result = [];
        // Get all invoices
        const allInvoices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllInvoices"])();
        // Create revenue data for the last 7 days
        for(let i = 0; i < 7; i++){
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            // Sum all invoices for this date
            const dateInvoices = allInvoices.filter((invoice)=>{
                const invoiceDate = new Date(invoice.createdAt);
                return invoiceDate.toISOString().split('T')[0] === dateString;
            });
            const totalAmount = dateInvoices.reduce((sum, invoice)=>sum + invoice.totalAmount, 0);
            result.push({
                date: dateString,
                amount: totalAmount
            });
        }
        // Sort by date ascending for easier chart rendering
        return result.sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error("Error getting daily revenue mock data:", error);
        return [];
    }
};
const getYearlyRevenue = async ()=>{
    try {
        const currentYear = new Date().getFullYear();
        const result = [];
        // Try to get authentication token from localStorage
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            console.log('Using API to get yearly revenue data');
            try {
                // Get data for the last 5 years using API
                for(let i = 0; i < 5; i++){
                    const year = currentYear - i;
                    const yearlyData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateYearlyRevenue"](tokenFromStorage, year.toString());
                    result.push({
                        year: year.toString(),
                        amount: yearlyData.totalAmount || 0
                    });
                }
            } catch (apiError) {
                console.error('Error fetching yearly revenue from API, falling back to mock data:', apiError);
                // Fall back to mock data if API fails
                return getYearlyRevenueMock();
            }
        } else {
            console.log('No auth token, using mock data for yearly revenue');
            // No token, use mock data
            return getYearlyRevenueMock();
        }
        // Sort by year ascending for easier chart rendering
        return result.sort((a, b)=>parseInt(a.year) - parseInt(b.year));
    } catch (error) {
        console.error("Error getting yearly revenue:", error);
        return [];
    }
};
// Mock function for yearly revenue when API is not available
const getYearlyRevenueMock = async ()=>{
    try {
        const currentYear = new Date().getFullYear();
        const result = [];
        // Get all invoices
        const allInvoices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllInvoices"])();
        // Calculate revenue for last 5 years
        for(let i = 0; i < 5; i++){
            const year = currentYear - i;
            // Sum all invoices for this year
            const yearInvoices = allInvoices.filter((invoice)=>{
                const invoiceDate = new Date(invoice.createdAt);
                return invoiceDate.getFullYear() === year;
            });
            const totalAmount = yearInvoices.reduce((sum, invoice)=>sum + invoice.totalAmount, 0);
            result.push({
                year: year.toString(),
                amount: totalAmount
            });
        }
        // Sort by year ascending for easier chart rendering
        return result.sort((a, b)=>parseInt(a.year) - parseInt(b.year));
    } catch (error) {
        console.error("Error getting yearly revenue mock data:", error);
        return [];
    }
};
const createPharmacyInvoice = async function(prescriptionId, totalAmount, token) {
    let medicines = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
    console.log("Creating pharmacy invoice for prescription ".concat(prescriptionId, " with amount ").concat(totalAmount));
    try {
        if (!token) {
            console.error("No authentication token available");
            throw new Error("Authentication required");
        }
        // Step 1: Mark prescription as DISPENSED
        console.log("Updating prescription status to DISPENSED for ID: ".concat(prescriptionId));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePrescriptionStatus"](prescriptionId, 'DISPENSED', token);
        // Step 2: Deduct medicines from inventory
        if (medicines && medicines.length > 0) {
            console.log("Processing ".concat(medicines.length, " medicines to update inventory"));
            // Get all prescription details for this prescription to get medicine IDs
            const prescriptionDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionDetails"](prescriptionId, token);
            // Create a map of medicine names to their IDs
            const medicineNameToIdMap = new Map();
            for (const detail of prescriptionDetails){
                // Extract medicine ID and name properly
                if (detail.medicineId) {
                    const medicine = detail.medicineId;
                    const medicineName = typeof medicine === 'object' ? medicine.name : '';
                    const medicineId = extractMedicineId(medicine);
                    if (medicineName && medicineId) {
                        medicineNameToIdMap.set(medicineName, medicineId);
                    }
                }
            }
            // Process each medicine and deduct from inventory
            for (const med of medicines){
                const medicineId = medicineNameToIdMap.get(med.name);
                if (medicineId) {
                    console.log("Deducting ".concat(med.quantity, " units of ").concat(med.name, " (ID: ").concat(medicineId, ") from inventory"));
                    try {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deductMedicineStock"](medicineId, med.quantity, token);
                    } catch (deductError) {
                        console.error("Error deducting medicine ".concat(med.name, ":"), deductError);
                    // Continue with other medicines even if one fails
                    }
                } else {
                    console.warn("Could not find medicine ID for ".concat(med.name, ", skipping inventory update"));
                }
            }
        } else {
            console.log("No medicines to process for inventory update");
        }
        console.log("Pharmacy invoice process completed successfully for prescription ".concat(prescriptionId));
        return true;
    } catch (error) {
        console.error("Error creating pharmacy invoice:", error);
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/PatientDetails.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientDetails": ()=>PatientDetails
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardListIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as PrinterIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PillIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as PillIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$Invoice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/Invoice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$pharmacyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/pharmacyUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const PatientDetails = (param)=>{
    let { patient, onPatientComplete } = param;
    _s();
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [showInvoice, setShowInvoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [medicines, setMedicines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(patient.prescription);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reset medicines state when patient changes to avoid showing stale data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientDetails.useEffect": ()=>{
            setMedicines(patient.prescription);
        }
    }["PatientDetails.useEffect"], [
        patient
    ]);
    // Fetch prescription details from MongoDB when component loads or patient changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientDetails.useEffect": ()=>{
            const fetchPrescriptionDetails = {
                "PatientDetails.useEffect.fetchPrescriptionDetails": async ()=>{
                    if (!token) return;
                    setIsLoading(true);
                    try {
                        // Get prescription details from the backend
                        const prescriptionDetails = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionDetails"])(patient.id, token);
                        console.log("Fetched ".concat(prescriptionDetails.length, " prescription details from MongoDB for ID: ").concat(patient.id));
                        // Transform prescription details to match our UI format
                        if (prescriptionDetails && prescriptionDetails.length > 0) {
                            const updatedMedicines = prescriptionDetails.map({
                                "PatientDetails.useEffect.fetchPrescriptionDetails.updatedMedicines": (detail)=>{
                                    var _detail_medicineId, _detail_medicineId1;
                                    return {
                                        name: ((_detail_medicineId = detail.medicineId) === null || _detail_medicineId === void 0 ? void 0 : _detail_medicineId.name) || 'Unknown',
                                        quantity: detail.quantity,
                                        dosage: detail.dosage,
                                        price: ((_detail_medicineId1 = detail.medicineId) === null || _detail_medicineId1 === void 0 ? void 0 : _detail_medicineId1.price) || 0 // medicineId is populated with price
                                    };
                                }
                            }["PatientDetails.useEffect.fetchPrescriptionDetails.updatedMedicines"]);
                            setMedicines(updatedMedicines);
                        } else {
                            // If no prescription details found, reset to an empty array
                            // This ensures we don't show old medicines when switching to a patient without prescriptions
                            setMedicines([]);
                        }
                    } catch (err) {
                        console.error("Error fetching prescription details:", err);
                        // Reset medicines to what was passed in props if API fetch fails
                        setMedicines(patient.prescription);
                        setError("Không thể tải chi tiết đơn thuốc từ máy chủ. Đang hiển thị dữ liệu cục bộ.");
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["PatientDetails.useEffect.fetchPrescriptionDetails"];
            fetchPrescriptionDetails();
        }
    }["PatientDetails.useEffect"], [
        patient.id,
        token,
        patient.prescription
    ]);
    // Handler for showing invoice
    const handleShowInvoice = async ()=>{
        setProcessing(true);
        setError(null);
        try {
            setShowInvoice(true);
        } catch (err) {
            console.error("Error preparing invoice:", err);
            setError(err.message || "Không thể tạo hóa đơn. Vui lòng thử lại.");
        } finally{
            setProcessing(false);
        }
    };
    // Tính tổng tiền của đơn thuốc
    const calculateTotal = ()=>{
        // Use our fetched medicines instead of patient.prescription
        return medicines.reduce((total, med)=>{
            return total + med.price * med.quantity;
        }, 0);
    };
    // Handler for completing prescription
    const handleComplete = async ()=>{
        console.log("PatientDetails: handleComplete started");
        setProcessing(true);
        setError(null);
        try {
            if (!token) {
                console.error("PatientDetails: No authentication token available");
                throw new Error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
            }
            const totalAmount = medicines.length > 0 ? calculateTotal() : 0;
            console.log("PatientDetails: Processing completion for patient ".concat(patient.fullName, " (ID: ").concat(patient.id, ")"));
            console.log("PatientDetails: Total amount to be recorded: ".concat(totalAmount, " VND"));
            console.log("PatientDetails: Medicines count: ".concat(medicines.length));
            // Mark prescription as DISPENSED even if there are no medicines
            console.log("PatientDetails: Calling createPharmacyInvoice...");
            // Pass medicines data to deduct quantities from inventory
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$pharmacyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPharmacyInvoice"])(patient.id, totalAmount, token, medicines);
            if (success) {
                console.log("PatientDetails: Invoice created successfully");
                // Close invoice and notify parent component
                setShowInvoice(false);
                console.log("PatientDetails: Notifying Dashboard of completion via onPatientComplete");
                // Thêm timeout nhỏ để đảm bảo UI cập nhật sau khi API hoàn tất
                setTimeout(()=>{
                    onPatientComplete(patient.id);
                    console.log("PatientDetails: Patient ".concat(patient.id, " removed from waiting list"));
                }, 300);
            } else {
                console.error("PatientDetails: Failed to create pharmacy invoice");
                throw new Error("Không thể cập nhật trạng thái đơn thuốc.");
            }
        } catch (err) {
            console.error("PatientDetails: Error completing prescription:", err);
            setError(err.message || "Không thể hoàn thành phát thuốc. Vui lòng thử lại.");
        } finally{
            setProcessing(false);
            console.log("PatientDetails: handleComplete process finished");
        }
    };
    if (showInvoice) {
        // Pass our fetched medicines data to Invoice component
        const patientWithUpdatedMeds = {
            ...patient,
            prescription: medicines
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$Invoice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Invoice"], {
            patient: patientWithUpdatedMeds,
            onClose: ()=>setShowInvoice(false),
            onComplete: handleComplete
        }, void 0, false, {
            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
            lineNumber: 155,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Định nghĩa calculateTotal đã được di chuyển lên trước hàm handleComplete
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 px-6 py-4 border-b border-gray-300 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-black flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PillIcon$3e$__["PillIcon"], {
                                size: 20,
                                className: "mr-2 text-black"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Chi Tiết Đơn Thuốc"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center text-red-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                size: 16,
                                className: "mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShowInvoice,
                        disabled: processing || isLoading,
                        className: "inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors shadow-sm ".concat(processing || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'),
                        title: "Xuất hóa đơn thuốc",
                        children: processing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Đang xử lý..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterIcon$3e$__["PrinterIcon"], {
                                    size: 16,
                                    className: "mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Xuất hóa đơn thuốc"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-4 rounded-lg border border-gray-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                        size: 18,
                                        className: "text-black mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-black",
                                        children: "Thông tin bệnh nhân"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black mb-1",
                                                children: "Họ và tên"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-black",
                                                children: patient.fullName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black mb-1",
                                                children: "Số điện thoại"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-black",
                                                children: patient.phone
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 219,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black mb-1",
                                                children: "Mã đơn thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-black",
                                                children: patient.serialNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 223,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-gray-300 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardListIcon$3e$__["ClipboardListIcon"], {
                                        size: 18,
                                        className: "text-black mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-black",
                                        children: "Thông tin y tế"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black mb-1",
                                                children: "Chẩn đoán"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-black",
                                                children: patient.diagnosis
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black mb-1",
                                                children: "Bác sĩ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-black",
                                                children: patient.doctor
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-black mb-4 flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PillIcon$3e$__["PillIcon"], {
                                        size: 18,
                                        className: "mr-2 text-black"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Đơn thuốc"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto border border-gray-300 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full divide-y divide-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-gray-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "STT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "Tên thuốc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "Số lượng"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "Liều dùng"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "Đơn giá"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "col",
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300",
                                                        children: "Thành tiền"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "bg-white divide-y divide-gray-300",
                                            children: [
                                                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "px-6 py-8 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center justify-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                    size: 24,
                                                                    className: "animate-spin text-blue-600 mb-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-600",
                                                                    children: "Đang tải chi tiết đơn thuốc..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)) : medicines.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "px-6 py-8 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center justify-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                    size: 24,
                                                                    className: "text-amber-500 mb-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-600",
                                                                    children: "Bệnh nhân này không có đơn thuốc nào."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)) : medicines.map((medicine, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: index + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: medicine.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: medicine.quantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: medicine.dosage
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: [
                                                                    medicine.price.toLocaleString('vi-VN'),
                                                                    " đ"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm text-black",
                                                                children: [
                                                                    (medicine.price * medicine.quantity).toLocaleString('vi-VN'),
                                                                    " đ"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))),
                                                medicines.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-gray-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 5,
                                                            className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-right border-t border-gray-400",
                                                            children: "Tổng cộng:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-t border-gray-400",
                                                            children: [
                                                                calculateTotal().toLocaleString('vi-VN'),
                                                                " đ"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pharmacyPage/PatientDetails.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PatientDetails, "wHCYgh1DHgxyB0hO2Gtr6TdIlRI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PatientDetails;
var _c;
__turbopack_context__.k.register(_c, "PatientDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/MedicineManager.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MedicineManager": ()=>MedicineManager
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const MedicineManager = (param)=>{
    let { onClose } = param;
    _s();
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [medicines, setMedicines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingMedicine, setEditingMedicine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newMedicine, setNewMedicine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customMedicineId: '',
        name: '',
        totalPills: 0,
        price: 0
    });
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterEnabled, setFilterEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchMedicines = async ()=>{
        if (!token) return;
        setLoading(true);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMedicines"](token);
            setMedicines(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching medicines:", err);
            setError("Không thể tải danh sách thuốc. Vui lòng thử lại.");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicineManager.useEffect": ()=>{
            fetchMedicines();
        }
    }["MedicineManager.useEffect"], [
        token
    ]);
    const handleAddMedicine = async ()=>{
        if (!token) return;
        // Validate form data
        if (!newMedicine.customMedicineId || !newMedicine.name || newMedicine.totalPills === undefined || newMedicine.price === undefined) {
            setError("Vui lòng điền đầy đủ thông tin thuốc.");
            return;
        }
        setLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMedicine"](newMedicine, token);
            // Reset form
            setNewMedicine({
                customMedicineId: '',
                name: '',
                totalPills: 0,
                price: 0
            });
            setShowAddForm(false);
            fetchMedicines();
            setError(null);
        } catch (err) {
            var _err_response_data, _err_response;
            console.error("Error adding medicine:", err);
            setError(((_err_response = err.response) === null || _err_response === void 0 ? void 0 : (_err_response_data = _err_response.data) === null || _err_response_data === void 0 ? void 0 : _err_response_data.message) || "Không thể thêm thuốc. Vui lòng thử lại.");
        } finally{
            setLoading(false);
        }
    };
    const handleEditMedicine = (medicine)=>{
        setEditingMedicine(medicine);
    };
    const handleSaveEdit = async ()=>{
        if (!token || !(editingMedicine === null || editingMedicine === void 0 ? void 0 : editingMedicine._id)) return;
        setLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMedicine"](editingMedicine._id, editingMedicine, token);
            setEditingMedicine(null);
            fetchMedicines();
            setError(null);
        } catch (err) {
            var _err_response_data, _err_response;
            console.error("Error updating medicine:", err);
            setError(((_err_response = err.response) === null || _err_response === void 0 ? void 0 : (_err_response_data = _err_response.data) === null || _err_response_data === void 0 ? void 0 : _err_response_data.message) || "Không thể cập nhật thuốc. Vui lòng thử lại.");
        } finally{
            setLoading(false);
        }
    };
    const handleDeleteMedicine = async (medicineId)=>{
        if (!token) return;
        if (!window.confirm("Bạn có chắc chắn muốn xóa thuốc này không?")) {
            return;
        }
        setLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMedicine"](medicineId, token);
            fetchMedicines();
            setError(null);
        } catch (err) {
            var _err_response_data, _err_response;
            console.error("Error deleting medicine:", err);
            setError(((_err_response = err.response) === null || _err_response === void 0 ? void 0 : (_err_response_data = _err_response.data) === null || _err_response_data === void 0 ? void 0 : _err_response_data.message) || "Không thể xóa thuốc. Vui lòng thử lại.");
        } finally{
            setLoading(false);
        }
    };
    const filteredMedicines = filterEnabled && searchTerm ? medicines.filter((med)=>med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.customMedicineId.toLowerCase().includes(searchTerm.toLowerCase())) : medicines;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-gray-300 rounded-lg shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-800 px-6 py-4 flex justify-between items-center rounded-t-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-white flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 20,
                                className: "mr-2 text-white"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Quản Lý Thuốc"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "text-white hover:text-gray-200 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-4 shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "h-5 w-5 text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-medium text-red-800",
                                            children: "Lỗi xảy ra"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 text-sm text-red-700",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between mb-4 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddForm(!showAddForm),
                                        className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                size: 16,
                                                className: "mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Thêm thuốc mới"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: fetchMedicines,
                                        disabled: loading,
                                        className: "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm ".concat(loading ? 'bg-gray-500 cursor-not-allowed text-gray-100 border-gray-500' : 'text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 16,
                                                className: "mr-2 ".concat(loading ? 'animate-spin' : '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Làm mới"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "h-4 w-4 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Tìm kiếm thuốc...",
                                        className: "pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800 bg-white",
                                        value: searchTerm,
                                        onChange: (e)=>{
                                            setSearchTerm(e.target.value);
                                            setFilterEnabled(true);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 p-5 mb-4 border border-blue-200 rounded-lg shadow-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-md font-medium mb-3 text-blue-900 flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                        size: 16,
                                        className: "mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Thêm thuốc mới"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Mã thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newMedicine.customMedicineId,
                                                onChange: (e)=>setNewMedicine({
                                                        ...newMedicine,
                                                        customMedicineId: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800",
                                                placeholder: "m123"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Tên thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newMedicine.name,
                                                onChange: (e)=>setNewMedicine({
                                                        ...newMedicine,
                                                        name: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800",
                                                placeholder: "Paracetamol 500mg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Số lượng"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newMedicine.totalPills,
                                                onChange: (e)=>setNewMedicine({
                                                        ...newMedicine,
                                                        totalPills: parseInt(e.target.value) || 0
                                                    }),
                                                className: "w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800",
                                                placeholder: "500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Đơn giá (VND)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.01",
                                                value: newMedicine.price,
                                                onChange: (e)=>setNewMedicine({
                                                        ...newMedicine,
                                                        price: parseFloat(e.target.value) || 0
                                                    }),
                                                className: "w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800",
                                                placeholder: "10000"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end space-x-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddForm(false),
                                        className: "px-4 py-2 border border-gray-400 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm",
                                        children: "Hủy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddMedicine,
                                        disabled: loading,
                                        className: "px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Đang xử lý..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                    size: 16,
                                                    className: "inline-block mr-1.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Thêm thuốc"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto border border-gray-300 rounded-lg shadow-sm bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full divide-y divide-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-blue-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider",
                                                children: "Mã thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 285,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider",
                                                children: "Tên thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider",
                                                children: "Số lượng"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider",
                                                children: "Đơn giá (VND)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider",
                                                children: "Thao tác"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: loading && filteredMedicines.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 5,
                                            className: "px-6 py-12 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            size: 24,
                                                            className: "animate-spin text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-blue-800 font-medium",
                                                        children: "Đang tải danh sách thuốc..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 296,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 295,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : filteredMedicines.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 5,
                                            className: "px-6 py-12 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center",
                                                children: searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            size: 32,
                                                            className: "text-gray-600 mb-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-800 font-medium",
                                                            children: "Không tìm thấy thuốc phù hợp với từ khóa"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                            size: 32,
                                                            className: "text-gray-600 mb-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-800 font-medium",
                                                            children: "Chưa có thuốc nào trong hệ thống"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 mt-1",
                                                            children: "Hãy thêm thuốc mới để bắt đầu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                lineNumber: 307,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : filteredMedicines.map((medicine)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50 transition-colors",
                                            children: editingMedicine && editingMedicine._id === medicine._id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: editingMedicine.customMedicineId,
                                                            onChange: (e)=>setEditingMedicine({
                                                                    ...editingMedicine,
                                                                    customMedicineId: e.target.value
                                                                }),
                                                            className: "w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: editingMedicine.name,
                                                            onChange: (e)=>setEditingMedicine({
                                                                    ...editingMedicine,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: editingMedicine.totalPills,
                                                            onChange: (e)=>setEditingMedicine({
                                                                    ...editingMedicine,
                                                                    totalPills: parseInt(e.target.value) || 0
                                                                }),
                                                            className: "w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.01",
                                                            value: editingMedicine.price,
                                                            onChange: (e)=>setEditingMedicine({
                                                                    ...editingMedicine,
                                                                    price: parseFloat(e.target.value) || 0
                                                                }),
                                                            className: "w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleSaveEdit,
                                                                    className: "p-1 bg-green-100 text-green-700 hover:bg-green-200 rounded",
                                                                    title: "Lưu",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                        lineNumber: 368,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditingMedicine(null),
                                                                    className: "p-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded",
                                                                    title: "Hủy",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                                        children: medicine.customMedicineId
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-800",
                                                        children: medicine.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-800",
                                                        children: medicine.totalPills.toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-800",
                                                        children: medicine.price.toLocaleString('vi-VN')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleEditMedicine(medicine),
                                                                    className: "p-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded",
                                                                    title: "Sửa",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                    lineNumber: 396,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>medicine._id && handleDeleteMedicine(medicine._id),
                                                                    className: "p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded",
                                                                    title: "Xóa",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                                    lineNumber: 403,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true)
                                        }, medicine._id, false, {
                                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                            lineNumber: 325,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pharmacyPage/MedicineManager.tsx",
        lineNumber: 125,
        columnNumber: 17
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MedicineManager, "BX9iwSd96UCNohxu3QdUm83hDMo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MedicineManager;
var _c;
__turbopack_context__.k.register(_c, "MedicineManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/Dashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Updated 2025-07-01: Removed Statistics tab and consolidated revenue features into InvoiceDetailModal
__turbopack_context__.s({
    "Dashboard": ()=>Dashboard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOutIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PillIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as PillIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$PatientList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/PatientList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$PatientDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/PatientDetails.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$MedicineManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/MedicineManager.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$pharmacyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/pharmacyUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const Dashboard = (param)=>{
    let { user, onLogout } = param;
    _s();
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])(); // Get token from auth context
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dispense'); // Only 'dispense' tab remains
    const [selectedPatient, setSelectedPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [waitingPatients, setWaitingPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showMedicineManager, setShowMedicineManager] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // State cho loading và error
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Tải dữ liệu bệnh nhân chờ phát thuốc từ API
    const fetchPatients = async ()=>{
        setIsLoading(true);
        setError(null);
        console.log("Dashboard: Starting fetchPatients function");
        console.log("Dashboard: Token available:", !!token);
        try {
            // Fetch prescriptions with status PENDING_DISPENSE
            console.log("Dashboard: Calling getPatientsWithPendingPrescriptions...");
            const patients = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$pharmacyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPatientsWithPendingPrescriptions"])();
            console.log("Dashboard: Fetched ".concat(patients.length, " patients with pending prescriptions"));
            console.log("Dashboard: Patient data:", patients);
            setWaitingPatients(patients);
            if (patients.length === 0) {
                // Reset selected patient if no patients are waiting
                console.log("Dashboard: No patients in queue, resetting selected patient");
                setSelectedPatient(null);
            }
        } catch (error) {
            console.error("Dashboard: Error fetching patients:", error);
            setError(error.message || "Không thể tải danh sách bệnh nhân");
            setWaitingPatients([]);
        } finally{
            setIsLoading(false);
        }
    };
    // Fetch patients on mount and when user changes
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            console.log("Dashboard: Initial useEffect - fetching patients");
            fetchPatients();
        }
    }["Dashboard.useEffect"], [
        user,
        token
    ]); // Add token as dependency
    // Setup polling for auto-refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            console.log("Dashboard: Setting up polling interval");
            // Set up polling for real-time updates
            const intervalId = setInterval({
                "Dashboard.useEffect.intervalId": ()=>{
                    // Only auto-refresh if not viewing a patient's details
                    if (!selectedPatient && !isLoading) {
                        console.log("Dashboard: Auto-refreshing patient list...");
                        fetchPatients();
                    }
                }
            }["Dashboard.useEffect.intervalId"], 60000); // Poll every minute
            return ({
                "Dashboard.useEffect": ()=>{
                    console.log("Dashboard: Clearing polling interval");
                    clearInterval(intervalId);
                }
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], [
        selectedPatient,
        isLoading
    ]);
    const handlePatientSelect = (patient)=>{
        console.log("Dashboard: Patient selected:", patient.id, patient.fullName);
        setSelectedPatient(patient);
    };
    const handlePatientRemove = (patientId)=>{
        console.log("Dashboard: Removing patient ".concat(patientId, " from waiting list after dispensing"));
        setWaitingPatients((prevPatients)=>prevPatients.filter((p)=>p.id !== patientId));
        setSelectedPatient(null);
        // Also refresh the list to ensure our counts are accurate
        setTimeout(()=>{
            fetchPatients();
        }, 1000); // Give the backend a moment to update
    };
    // Add debug output for the render cycle
    console.log("Dashboard: Rendering with state:", {
        activeTab,
        selectedPatient: selectedPatient ? "".concat(selectedPatient.id, " - ").concat(selectedPatient.fullName) : "none",
        waitingPatients: waitingPatients.length,
        isLoading,
        error
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            showMedicineManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$MedicineManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicineManager"], {
                        onClose: ()=>setShowMedicineManager(false)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                    lineNumber: 124,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-blue-700 text-white shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold",
                            children: "Hệ Thống Quản Lý Nhà Thuốc"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowMedicineManager(true),
                                    className: "inline-flex items-center px-3 py-1.5 border border-green-800 text-sm rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md font-medium",
                                    title: "Quản lý danh mục thuốc",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "h-4 w-4 mr-1.5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Quản Lý Thuốc"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: [
                                        "Xin chào, ",
                                        (user === null || user === void 0 ? void 0 : user.fullName) || 'Nhân viên'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onLogout,
                                    className: "inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-900 transition duration-150 ease-in-out",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__["LogOutIcon"], {
                                            className: "h-4 w-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Đăng Xuất"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center h-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-blue-500 text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PillIcon$3e$__["PillIcon"], {
                                        className: "h-5 w-5 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Phát Thuốc"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-1/3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$PatientList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientList"], {
                                patients: waitingPatients,
                                onPatientSelect: handlePatientSelect,
                                onRefresh: fetchPatients,
                                isLoading: isLoading,
                                error: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-2/3",
                            children: isLoading && !selectedPatient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Đang tải danh sách bệnh nhân..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 183,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : error && !selectedPatient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-red-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "h-8 w-8 text-red-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                                lineNumber: 190,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-600 font-medium mb-2",
                                            children: "Không thể tải dữ liệu"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 mb-4",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: fetchPatients,
                                            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                                            children: "Thử lại"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : selectedPatient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$PatientDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientDetails"], {
                                patient: selectedPatient,
                                onPatientComplete: handlePatientRemove
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 203,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                className: "h-8 w-8 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 font-medium mb-2",
                                            children: "Chưa có bệnh nhân nào được chọn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500",
                                            children: "Vui lòng chọn bệnh nhân từ danh sách để xem chi tiết đơn thuốc."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                                lineNumber: 205,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "bg-white border-t border-gray-200 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-sm text-gray-500",
                        children: "Hệ Thống Quản Lý Nhà Thuốc. Bản quyền thuộc về Phòng Khám."
                    }, void 0, false, {
                        fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pharmacyPage/Dashboard.tsx",
        lineNumber: 120,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Dashboard, "p9wTOFtBW9Q8OW8TB2sAu0wkDPc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pharmacyPage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PharmacyPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pharmacyPage/Dashboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PharmacyPage() {
    _s();
    const { user, isAuthenticated, token, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Add debug logging
    console.log('PharmacyPage: Rendering page component');
    console.log('PharmacyPage: Authentication state:', {
        isAuthenticated,
        hasUser: !!user,
        userRole: (user === null || user === void 0 ? void 0 : user.role) || 'none',
        hasToken: !!token
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PharmacyPage.useEffect": ()=>{
            console.log('PharmacyPage: Authentication check effect running');
            if (!isAuthenticated) {
                console.log('PharmacyPage: Not authenticated, redirecting to login');
                router.push('/login');
            } else if ((user === null || user === void 0 ? void 0 : user.role) !== 'PHARMACIST') {
                // Nếu người dùng không phải là dược sĩ, chuyển hướng về trang đăng nhập
                console.log("PharmacyPage: User role ".concat(user === null || user === void 0 ? void 0 : user.role, " is not PHARMACIST, logging out"));
                logout();
                router.push('/login');
            } else {
                console.log('PharmacyPage: Authentication check passed');
            }
        }
    }["PharmacyPage.useEffect"], [
        isAuthenticated,
        router,
        user,
        logout
    ]);
    if (!isAuthenticated || !user) {
        console.log('PharmacyPage: Rendering loading state');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/src/app/pharmacyPage/page.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/pharmacyPage/page.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    console.log('PharmacyPage: Rendering Dashboard with user:', user.fullName);
    console.log('PharmacyPage: Token available:', !!token);
    // If token is available, store it in localStorage for API calls
    if (token) {
        console.log('PharmacyPage: Saving token to localStorage for API calls');
        localStorage.setItem('token', token);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-full min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pharmacyPage$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dashboard"], {
            user: user,
            onLogout: logout
        }, void 0, false, {
            fileName: "[project]/src/app/pharmacyPage/page.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pharmacyPage/page.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(PharmacyPage, "rPKYSRSGo7Q3GHopIPIPoxvj1Fo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PharmacyPage;
var _c;
__turbopack_context__.k.register(_c, "PharmacyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_5abaab05._.js.map