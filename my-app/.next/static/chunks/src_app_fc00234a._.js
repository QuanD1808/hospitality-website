(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/dashboard-doctor/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Header": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOutIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const Header = ()=>{
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleLogout = ()=>{
        logout();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white shadow-sm border-b border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-blue-600",
                                children: "MediClinic"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                lineNumber: 17,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                            lineNumber: 16,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center text-sm text-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-gray-900",
                                        children: user?.fullName || user?.username
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-2 text-gray-600",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: user?.specialization || user?.role
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                        lineNumber: 24,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: "ml-2 p-1 rounded-full text-gray-600 hover:text-red-600 focus:outline-none flex items-center cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__["LogOutIcon"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                            lineNumber: 31,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 text-sm hidden sm:inline",
                                            children: "Đăng xuất"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                            lineNumber: 32,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard-doctor/Header.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
};
_s(Header, "Y2yJqNRSIsw4bTBalEEjifwiq3w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/PatientCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientCard": (()=>PatientCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as ClockIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as PhoneIcon>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const PatientCard = ({ patientInQueue, isSelected, onSelect })=>{
    _s();
    // Lấy thông tin người dùng từ patientInQueue
    const patient = patientInQueue.patientInfo;
    if (!patient) {
        return null; // Không hiển thị nếu không có thông tin người dùng
    }
    const [waitingTime, setWaitingTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PatientCard.useState": ()=>Math.floor((new Date().getTime() - new Date(patientInQueue.createdAt).getTime()) / 60000)
    }["PatientCard.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientCard.useEffect": ()=>{
            const interval = setInterval({
                "PatientCard.useEffect.interval": ()=>{
                    setWaitingTime(Math.floor((new Date().getTime() - new Date(patientInQueue.createdAt).getTime()) / 60000));
                }
            }["PatientCard.useEffect.interval"], 1000);
            return ({
                "PatientCard.useEffect": ()=>clearInterval(interval)
            })["PatientCard.useEffect"];
        }
    }["PatientCard.useEffect"], [
        patientInQueue.createdAt
    ]);
    const formatPhoneNumber = (phone)=>{
        if (phone.startsWith('+84')) {
            return phone.replace(/(\+84)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
        }
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`,
        onClick: onSelect,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-gray-900",
                            children: patient.fullName
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-800",
                            children: [
                                patient.role,
                                " • ",
                                new Date(patientInQueue.createdAt).toLocaleDateString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center text-sm text-gray-800 mt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__["PhoneIcon"], {
                                    className: "h-3 w-3 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                formatPhoneNumber(patient.phone)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-800 mt-1",
                            children: patient.email
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mt-1 text-sm text-gray-900 font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                className: "h-4 w-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Đợi: ",
                                    waitingTime,
                                    " phút"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard-doctor/PatientCard.tsx",
        lineNumber: 55,
        columnNumber: 10
    }, this);
};
_s(PatientCard, "QpydFz1/r7qkUtUuELItlt8jtg4=");
_c = PatientCard;
var _c;
__turbopack_context__.k.register(_c, "PatientCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/PatientList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientList": (()=>PatientList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/PatientCard.tsx [app-client] (ecmascript)");
'use client';
;
;
const PatientList = ({ patients, onSelectPatient, selectedPatientId })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-gray-200 flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-semibold text-gray-900",
                    children: "Danh sách bệnh nhân"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 overflow-y-auto",
                style: {
                    maxHeight: 'calc(100vh - 200px)'
                },
                children: patients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-700 text-sm",
                    children: "Không có bệnh nhân trong danh sách chờ."
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: patients.map((patient, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: idx === 0 ? '' : 'opacity-50 pointer-events-none',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientCard"], {
                                patientInQueue: patient,
                                isSelected: selectedPatientId === patient._id,
                                onSelect: ()=>idx === 0 && onSelectPatient(patient)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                                lineNumber: 42,
                                columnNumber: 17
                            }, this)
                        }, patient._id, false, {
                            fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                            lineNumber: 41,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard-doctor/PatientList.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_c = PatientList;
var _c;
__turbopack_context__.k.register(_c, "PatientList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Mock database dựa trên cấu trúc MongoDB
// Khai báo các interface
__turbopack_context__.s({
    "addPatient": (()=>addPatient),
    "addQueue": (()=>addQueue),
    "deletePatient": (()=>deletePatient),
    "deleteQueue": (()=>deleteQueue),
    "generateMongoId": (()=>generateMongoId),
    "generateNextUserId": (()=>generateNextUserId),
    "getAllDoctors": (()=>getAllDoctors),
    "getAllInvoices": (()=>getAllInvoices),
    "getAllMedicines": (()=>getAllMedicines),
    "getAllPatients": (()=>getAllPatients),
    "getAllPrescriptionDetails": (()=>getAllPrescriptionDetails),
    "getAllPrescriptions": (()=>getAllPrescriptions),
    "getAllQueues": (()=>getAllQueues),
    "getAllQueuesWithPatientInfo": (()=>getAllQueuesWithPatientInfo),
    "getAllUsers": (()=>getAllUsers),
    "getInvoiceById": (()=>getInvoiceById),
    "getInvoiceByPrescriptionId": (()=>getInvoiceByPrescriptionId),
    "getInvoicesByPatientId": (()=>getInvoicesByPatientId),
    "getInvoicesByStatus": (()=>getInvoicesByStatus),
    "getMedicineById": (()=>getMedicineById),
    "getMedicinesForPrescription": (()=>getMedicinesForPrescription),
    "getPatientFullPrescriptionDetails": (()=>getPatientFullPrescriptionDetails),
    "getPrescriptionById": (()=>getPrescriptionById),
    "getPrescriptionDetailsByPrescriptionId": (()=>getPrescriptionDetailsByPrescriptionId),
    "getPrescriptionsByDoctorId": (()=>getPrescriptionsByDoctorId),
    "getPrescriptionsByPatientId": (()=>getPrescriptionsByPatientId),
    "getPrescriptionsByStatus": (()=>getPrescriptionsByStatus),
    "getQueueByPatientId": (()=>getQueueByPatientId),
    "getQueuesByStatus": (()=>getQueuesByStatus),
    "getUserById": (()=>getUserById),
    "getUsersByRole": (()=>getUsersByRole),
    "getWaitingPatients": (()=>getWaitingPatients),
    "mockInvoices": (()=>mockInvoices),
    "mockMedicines": (()=>mockMedicines),
    "mockPatients": (()=>mockPatients),
    "mockPrescriptionDetails": (()=>mockPrescriptionDetails),
    "mockPrescriptions": (()=>mockPrescriptions),
    "mockQueues": (()=>mockQueues),
    "mockUsers": (()=>mockUsers),
    "searchMedicines": (()=>searchMedicines),
    "searchUsers": (()=>searchUsers),
    "updatePatient": (()=>updatePatient),
    "updateQueueStatus": (()=>updateQueueStatus)
});
const mockUsers = [
    {
        _id: '685face13fc4c04e1bd96c06',
        userId: 'u1',
        username: 'nguyen.an',
        email: 'an.nguyen@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Nguyễn Văn An',
        phone: '0901234567',
        role: 'PATIENT',
        createdAt: '2025-06-28T08:50:41.269+00:00',
        updatedAt: '2025-06-28T08:50:41.269+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c07',
        userId: 'u2',
        username: 'tran.binh',
        email: 'binh.tran@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Trần Văn Bình',
        phone: '0912345678',
        role: 'PATIENT',
        createdAt: '2025-06-28T09:15:22.123+00:00',
        updatedAt: '2025-06-28T09:15:22.123+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c08',
        userId: 'd1',
        username: 'dr.hoa',
        email: 'hoa.doctor@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Bác sĩ Trần Thị Hoa',
        phone: '0923456789',
        role: 'DOCTOR',
        createdAt: '2025-06-28T10:05:17.456+00:00',
        updatedAt: '2025-06-28T10:05:17.456+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c09',
        userId: 'u3',
        username: 'le.chi',
        email: 'chi.le@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Lê Thị Chi',
        phone: '0934567890',
        role: 'PATIENT',
        createdAt: '2025-06-28T11:30:45.789+00:00',
        updatedAt: '2025-06-28T11:30:45.789+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0a',
        userId: 'p1',
        username: 'pham.dung',
        email: 'dung.pham@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Phạm Văn Dũng',
        phone: '0945678901',
        role: 'PHARMACIST',
        createdAt: '2025-06-28T12:45:33.012+00:00',
        updatedAt: '2025-06-28T12:45:33.012+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0b',
        userId: 'r1',
        username: 'receptionist.minh',
        email: 'minh.receptionist@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Nguyễn Thị Minh',
        phone: '0956789012',
        role: 'RECEPTIONIST',
        createdAt: '2025-06-28T14:20:10.345+00:00',
        updatedAt: '2025-06-28T14:20:10.345+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0c',
        userId: 'a1',
        username: 'admin.tuan',
        email: 'tuan.admin@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Lê Minh Tuấn',
        phone: '0967890123',
        role: 'ADMIN',
        createdAt: '2025-06-28T15:55:27.678+00:00',
        updatedAt: '2025-06-28T15:55:27.678+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0d',
        userId: 'u4',
        username: 'hoang.em',
        email: 'em.hoang@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Hoàng Thị Em',
        phone: '0978901234',
        role: 'PATIENT',
        createdAt: '2025-06-28T16:30:50.901+00:00',
        updatedAt: '2025-06-28T16:30:50.901+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0e',
        userId: 'u5',
        username: 'nguyen.khang',
        email: 'khang.nguyen@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Nguyễn Minh Khang',
        phone: '0989012345',
        role: 'PATIENT',
        createdAt: '2025-06-28T17:15:42.234+00:00',
        updatedAt: '2025-06-28T17:15:42.234+00:00',
        __v: 0
    },
    {
        _id: '685face13fc4c04e1bd96c0f',
        userId: 'd2',
        username: 'dr.trang',
        email: 'trang.doctor@mediclinic.com',
        password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: 'Bác sĩ Lê Thị Trang',
        phone: '0990123456',
        role: 'DOCTOR',
        createdAt: '2025-06-28T18:40:15.567+00:00',
        updatedAt: '2025-06-28T18:40:15.567+00:00',
        __v: 0
    }
];
const mockQueues = [
    {
        _id: '685f10baa8040f24f1a9014d',
        patient: '685face13fc4c04e1bd96c06',
        status: 'waiting',
        createdAt: '2025-06-27T21:44:26.099+00:00',
        updatedAt: '2025-06-27T21:44:26.102+00:00',
        __v: 0
    },
    {
        _id: '685f10baa8040f24f1a9014e',
        patient: '685face13fc4c04e1bd96c07',
        status: 'in_progress',
        createdAt: '2025-06-27T22:30:15.456+00:00',
        updatedAt: '2025-06-27T22:45:20.789+00:00',
        __v: 0
    },
    {
        _id: '685f10baa8040f24f1a9014f',
        patient: '685face13fc4c04e1bd96c09',
        status: 'completed',
        createdAt: '2025-06-27T20:15:33.222+00:00',
        updatedAt: '2025-06-27T21:05:42.111+00:00',
        __v: 0
    },
    {
        _id: '685f10baa8040f24f1a90150',
        patient: '685face13fc4c04e1bd96c0d',
        status: 'waiting',
        createdAt: '2025-06-28T08:22:17.345+00:00',
        updatedAt: '2025-06-28T08:22:17.345+00:00',
        __v: 0
    },
    {
        _id: '685f10baa8040f24f1a90151',
        patient: '685face13fc4c04e1bd96c0e',
        status: 'canceled',
        createdAt: '2025-06-28T07:45:10.123+00:00',
        updatedAt: '2025-06-28T08:15:23.456+00:00',
        __v: 0
    }
];
const mockMedicines = [
    {
        _id: '685face13fc4c04e1bd96c10',
        customMedicineId: 'm1',
        name: 'Paracetamol 500mg',
        totalPills: 980,
        price: 0.5,
        __v: 0,
        createdAt: '2025-06-28T08:50:41.969+00:00',
        updatedAt: '2025-06-28T10:57:49.516+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96c11',
        customMedicineId: 'm2',
        name: 'Amoxicillin 500mg',
        totalPills: 850,
        price: 1.2,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.001+00:00',
        updatedAt: '2025-06-28T08:50:42.001+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96c12',
        customMedicineId: 'm3',
        name: 'Ibuprofen 200mg',
        totalPills: 1200,
        price: 0.7,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.010+00:00',
        updatedAt: '2025-06-28T08:50:42.010+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96c1a',
        customMedicineId: 'm4',
        name: 'Cetirizine 10mg',
        totalPills: 750,
        price: 0.8,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.022+00:00',
        updatedAt: '2025-06-28T08:50:42.022+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96c1b',
        customMedicineId: 'm5',
        name: 'Omeprazole 20mg',
        totalPills: 630,
        price: 1.5,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d20',
        customMedicineId: 'm6',
        name: 'Loratadine 10mg',
        totalPills: 520,
        price: 0.9,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d21',
        customMedicineId: 'm7',
        name: 'Amlodipine 5mg',
        totalPills: 480,
        price: 1.8,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d22',
        customMedicineId: 'm8',
        name: 'Atorvastatin 20mg',
        totalPills: 360,
        price: 2.5,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d23',
        customMedicineId: 'm9',
        name: 'Metformin 500mg',
        totalPills: 720,
        price: 0.6,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d24',
        customMedicineId: 'm10',
        name: 'Clopidogrel 75mg',
        totalPills: 280,
        price: 3.2,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d25',
        customMedicineId: 'm11',
        name: 'Losartan 50mg',
        totalPills: 420,
        price: 2.1,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d26',
        customMedicineId: 'm12',
        name: 'Simvastatin 40mg',
        totalPills: 310,
        price: 1.7,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d27',
        customMedicineId: 'm13',
        name: 'Aspirin 100mg',
        totalPills: 940,
        price: 0.3,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d28',
        customMedicineId: 'm14',
        name: 'Metoprolol 25mg',
        totalPills: 390,
        price: 1.9,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d29',
        customMedicineId: 'm15',
        name: 'Furosemide 40mg',
        totalPills: 280,
        price: 1.4,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d30',
        customMedicineId: 'm16',
        name: 'Pantoprazole 40mg',
        totalPills: 450,
        price: 2.0,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d31',
        customMedicineId: 'm17',
        name: 'Fluoxetine 20mg',
        totalPills: 320,
        price: 2.3,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d32',
        customMedicineId: 'm18',
        name: 'Sertraline 50mg',
        totalPills: 290,
        price: 2.4,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d33',
        customMedicineId: 'm19',
        name: 'Ranitidine 150mg',
        totalPills: 580,
        price: 0.8,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d34',
        customMedicineId: 'm20',
        name: 'Tramadol 50mg',
        totalPills: 240,
        price: 2.8,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d35',
        customMedicineId: 'm21',
        name: 'Diazepam 5mg',
        totalPills: 180,
        price: 3.5,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d36',
        customMedicineId: 'm22',
        name: 'Gabapentin 300mg',
        totalPills: 340,
        price: 2.2,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d37',
        customMedicineId: 'm23',
        name: 'Pregabalin 75mg',
        totalPills: 260,
        price: 3.1,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d38',
        customMedicineId: 'm24',
        name: 'Lisinopril 10mg',
        totalPills: 410,
        price: 1.6,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d39',
        customMedicineId: 'm25',
        name: 'Vitamin D3 1000IU',
        totalPills: 790,
        price: 0.4,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d40',
        customMedicineId: 'm26',
        name: 'Folic Acid 5mg',
        totalPills: 870,
        price: 0.3,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d41',
        customMedicineId: 'm27',
        name: 'Calcium Carbonate 500mg',
        totalPills: 680,
        price: 0.5,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d42',
        customMedicineId: 'm28',
        name: 'Azithromycin 500mg',
        totalPills: 220,
        price: 3.8,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d43',
        customMedicineId: 'm29',
        name: 'Ciprofloxacin 500mg',
        totalPills: 250,
        price: 2.9,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    },
    {
        _id: '685face13fc4c04e1bd96d44',
        customMedicineId: 'm30',
        name: 'Montelukast 10mg',
        totalPills: 310,
        price: 2.7,
        __v: 0,
        createdAt: '2025-06-28T08:50:42.029+00:00',
        updatedAt: '2025-06-28T08:50:42.029+00:00'
    }
];
const mockPrescriptions = [
    {
        _id: '685face23fc4c04e1bd96c13',
        customPrescriptionId: 'pr1',
        patientId: '685face13fc4c04e1bd96c06',
        doctorId: '685face13fc4c04e1bd96c08',
        diagnosis: 'Common Cold',
        date: '2024-06-01T10:00:00.000+00:00',
        status: 'PENDING_DISPENSE',
        __v: 0,
        createdAt: '2025-06-28T08:50:42.030+00:00',
        updatedAt: '2025-06-28T08:50:42.030+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c14',
        customPrescriptionId: 'pr2',
        patientId: '685face13fc4c04e1bd96c07',
        doctorId: '685face13fc4c04e1bd96c0f',
        diagnosis: 'Allergic Rhinitis',
        date: '2024-06-02T11:30:00.000+00:00',
        status: 'DISPENSED',
        __v: 0,
        createdAt: '2025-06-28T09:30:10.123+00:00',
        updatedAt: '2025-06-28T10:15:22.456+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c15',
        customPrescriptionId: 'pr3',
        patientId: '685face13fc4c04e1bd96c09',
        doctorId: '685face13fc4c04e1bd96c08',
        diagnosis: 'Gastritis',
        date: '2024-06-03T14:45:00.000+00:00',
        status: 'PENDING_DISPENSE',
        __v: 0,
        createdAt: '2025-06-28T14:50:33.789+00:00',
        updatedAt: '2025-06-28T14:50:33.789+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c1c',
        customPrescriptionId: 'pr4',
        patientId: '685face13fc4c04e1bd96c0d',
        doctorId: '685face13fc4c04e1bd96c0f',
        diagnosis: 'Migraine',
        date: '2024-06-04T09:15:00.000+00:00',
        status: 'CANCELED',
        __v: 0,
        createdAt: '2025-06-28T09:20:45.111+00:00',
        updatedAt: '2025-06-28T11:05:17.222+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c1d',
        customPrescriptionId: 'pr5',
        patientId: '685face13fc4c04e1bd96c0e',
        doctorId: '685face13fc4c04e1bd96c08',
        diagnosis: 'Hypertension',
        date: '2024-06-05T16:00:00.000+00:00',
        status: 'DISPENSED',
        __v: 0,
        createdAt: '2025-06-28T16:05:22.333+00:00',
        updatedAt: '2025-06-28T17:30:14.444+00:00'
    }
];
const mockPrescriptionDetails = [
    {
        _id: '685face23fc4c04e1bd96c16',
        customPrescriptionDetailId: 'pd1',
        prescriptionId: '685face23fc4c04e1bd96c13',
        medicineId: '685face13fc4c04e1bd96c10',
        quantity: 10,
        dosage: '1 tablet every 6 hours',
        __v: 0,
        createdAt: '2025-06-28T08:50:42.083+00:00',
        updatedAt: '2025-06-28T08:50:42.083+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c17',
        customPrescriptionDetailId: 'pd2',
        prescriptionId: '685face23fc4c04e1bd96c13',
        medicineId: '685face13fc4c04e1bd96c1a',
        quantity: 5,
        dosage: '1 tablet daily before sleep',
        __v: 0,
        createdAt: '2025-06-28T08:50:42.085+00:00',
        updatedAt: '2025-06-28T08:50:42.085+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c18',
        customPrescriptionDetailId: 'pd3',
        prescriptionId: '685face23fc4c04e1bd96c14',
        medicineId: '685face13fc4c04e1bd96c1a',
        quantity: 15,
        dosage: '1 tablet daily in the morning',
        __v: 0,
        createdAt: '2025-06-28T09:30:10.150+00:00',
        updatedAt: '2025-06-28T09:30:10.150+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c19',
        customPrescriptionDetailId: 'pd4',
        prescriptionId: '685face23fc4c04e1bd96c15',
        medicineId: '685face13fc4c04e1bd96c1b',
        quantity: 14,
        dosage: '1 tablet daily before breakfast',
        __v: 0,
        createdAt: '2025-06-28T14:50:33.800+00:00',
        updatedAt: '2025-06-28T14:50:33.800+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c1e',
        customPrescriptionDetailId: 'pd5',
        prescriptionId: '685face23fc4c04e1bd96c1c',
        medicineId: '685face13fc4c04e1bd96c12',
        quantity: 20,
        dosage: '2 tablets every 8 hours when in pain',
        __v: 0,
        createdAt: '2025-06-28T09:20:45.130+00:00',
        updatedAt: '2025-06-28T09:20:45.130+00:00'
    },
    {
        _id: '685face23fc4c04e1bd96c1f',
        customPrescriptionDetailId: 'pd6',
        prescriptionId: '685face23fc4c04e1bd96c1d',
        medicineId: '685face13fc4c04e1bd96c11',
        quantity: 30,
        dosage: '1 tablet three times daily after meals',
        __v: 0,
        createdAt: '2025-06-28T16:05:22.350+00:00',
        updatedAt: '2025-06-28T16:05:22.350+00:00'
    }
];
const mockInvoices = [
    {
        _id: '685f6f336bd59d7487de3ce8',
        prescriptionId: '685face23fc4c04e1bd96c14',
        patientId: '685face13fc4c04e1bd96c07',
        totalAmount: 12.0,
        status: 'PAID',
        __v: 0,
        createdAt: '2025-06-28T10:15:22.456+00:00',
        updatedAt: '2025-06-28T10:15:22.456+00:00'
    },
    {
        _id: '685f6f336bd59d7487de3ce9',
        prescriptionId: '685face23fc4c04e1bd96c1d',
        patientId: '685face13fc4c04e1bd96c0e',
        totalAmount: 36.0,
        status: 'PAID',
        __v: 0,
        createdAt: '2025-06-28T17:30:14.444+00:00',
        updatedAt: '2025-06-28T17:30:14.444+00:00'
    },
    {
        _id: '685f6f336bd59d7487de3cea',
        prescriptionId: '685face23fc4c04e1bd96c13',
        patientId: '685face13fc4c04e1bd96c06',
        totalAmount: 9.0,
        status: 'UNPAID',
        __v: 0,
        createdAt: '2025-06-28T08:50:42.030+00:00',
        updatedAt: '2025-06-28T08:50:42.030+00:00'
    }
];
const getAllUsers = ()=>[
        ...mockUsers
    ];
const getUserById = (id)=>{
    return mockUsers.find((user)=>user._id === id);
};
const getUsersByRole = (role)=>{
    return mockUsers.filter((user)=>user.role === role);
};
const searchUsers = (searchTerm)=>{
    const term = searchTerm.toLowerCase();
    return mockUsers.filter((user)=>user.fullName.toLowerCase().includes(term) || user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.phone.includes(term) || user.userId.includes(term));
};
const getAllQueues = ()=>[
        ...mockQueues
    ];
const getQueuesByStatus = (status)=>{
    return mockQueues.filter((queue)=>queue.status === status);
};
const getQueueByPatientId = (patientId)=>{
    return mockQueues.find((queue)=>queue.patient === patientId);
};
const getAllMedicines = ()=>[
        ...mockMedicines
    ];
const getMedicineById = (id)=>{
    return mockMedicines.find((medicine)=>medicine._id === id);
};
const searchMedicines = (searchTerm)=>{
    const term = searchTerm.toLowerCase();
    return mockMedicines.filter((medicine)=>medicine.name.toLowerCase().includes(term) || medicine.customMedicineId.includes(term));
};
const getAllPrescriptions = ()=>[
        ...mockPrescriptions
    ];
const getPrescriptionById = (id)=>{
    return mockPrescriptions.find((prescription)=>prescription._id === id);
};
const getPrescriptionsByPatientId = (patientId)=>{
    return mockPrescriptions.filter((prescription)=>prescription.patientId === patientId);
};
const getPrescriptionsByDoctorId = (doctorId)=>{
    return mockPrescriptions.filter((prescription)=>prescription.doctorId === doctorId);
};
const getPrescriptionsByStatus = (status)=>{
    return mockPrescriptions.filter((prescription)=>prescription.status === status);
};
const getAllPrescriptionDetails = ()=>[
        ...mockPrescriptionDetails
    ];
const getPrescriptionDetailsByPrescriptionId = (prescriptionId)=>{
    return mockPrescriptionDetails.filter((detail)=>detail.prescriptionId === prescriptionId);
};
const getMedicinesForPrescription = (prescriptionId)=>{
    const details = getPrescriptionDetailsByPrescriptionId(prescriptionId);
    return details.map((detail)=>{
        const medicine = getMedicineById(detail.medicineId);
        return {
            ...detail,
            medicine: medicine || null
        };
    });
};
const getAllInvoices = ()=>[
        ...mockInvoices
    ];
const getInvoiceById = (id)=>{
    return mockInvoices.find((invoice)=>invoice._id === id);
};
const getInvoiceByPrescriptionId = (prescriptionId)=>{
    return mockInvoices.find((invoice)=>invoice.prescriptionId === prescriptionId);
};
const getInvoicesByPatientId = (patientId)=>{
    return mockInvoices.filter((invoice)=>invoice.patientId === patientId);
};
const getInvoicesByStatus = (status)=>{
    return mockInvoices.filter((invoice)=>invoice.status === status);
};
const getPatientFullPrescriptionDetails = (patientId)=>{
    // Lấy tất cả đơn thuốc của bệnh nhân
    const prescriptions = getPrescriptionsByPatientId(patientId);
    return prescriptions.map((prescription)=>{
        // Lấy thông tin bác sĩ
        const doctor = getUserById(prescription.doctorId);
        // Lấy chi tiết đơn thuốc và thông tin thuốc
        const details = getPrescriptionDetailsByPrescriptionId(prescription._id);
        const medicineDetails = details.map((detail)=>{
            const medicine = getMedicineById(detail.medicineId);
            return {
                ...detail,
                medicineName: medicine ? medicine.name : 'Unknown',
                medicinePrice: medicine ? medicine.price : 0
            };
        });
        // Lấy hóa đơn nếu có
        const invoice = getInvoiceByPrescriptionId(prescription._id);
        return {
            ...prescription,
            doctorName: doctor ? doctor.fullName : 'Unknown',
            details: medicineDetails,
            invoice: invoice || null
        };
    });
};
const getAllPatients = ()=>{
    return mockUsers.filter((user)=>user.role === 'PATIENT');
};
const getAllDoctors = ()=>{
    return mockUsers.filter((user)=>user.role === 'DOCTOR');
};
const mockPatients = getAllPatients();
const generateMongoId = ()=>{
    // MongoDB ObjectId format: 24 hex characters
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const randomPart = Array(16).fill(0).map(()=>Math.floor(Math.random() * 16).toString(16)).join('');
    return timestamp + randomPart;
};
const generateNextUserId = ()=>{
    // Tìm user ID lớn nhất hiện tại với pattern 'u' + number
    const patientUserIds = mockUsers.filter((user)=>user.role === 'PATIENT' && /^u\d+$/.test(user.userId)).map((user)=>parseInt(user.userId.substring(1)));
    const nextNumber = patientUserIds.length > 0 ? Math.max(...patientUserIds) + 1 : 1;
    return `u${nextNumber}`;
};
// Hàm kiểm tra trùng lặp userId, username, email
const checkDuplicates = (patient)=>{
    const errors = [];
    // Kiểm tra userId nếu được cung cấp
    if (patient.userId && mockUsers.some((user)=>user.userId === patient.userId)) {
        errors.push(`User ID '${patient.userId}' đã tồn tại`);
    }
    // Kiểm tra username nếu được cung cấp
    if (patient.username && mockUsers.some((user)=>user.username === patient.username)) {
        errors.push(`Username '${patient.username}' đã tồn tại`);
    }
    // Kiểm tra email nếu được cung cấp
    if (patient.email && mockUsers.some((user)=>user.email === patient.email)) {
        errors.push(`Email '${patient.email}' đã tồn tại`);
    }
    return errors;
};
const addPatient = (patient)=>{
    // Kiểm tra thông tin trùng lặp
    const duplicateErrors = checkDuplicates(patient);
    if (duplicateErrors.length > 0) {
        throw new Error(`Không thể thêm bệnh nhân: ${duplicateErrors.join(', ')}`);
    }
    // Tạo ID MongoDB-like mới
    const _id = generateMongoId();
    const now = new Date().toISOString();
    // Tạo userId tự động nếu không được cung cấp
    const userId = patient.userId || generateNextUserId();
    const newPatient = {
        _id,
        userId,
        username: patient.username || `patient_${userId}`,
        email: patient.email || `${userId}@example.com`,
        password: patient.password || '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
        fullName: patient.fullName || 'Bệnh nhân mới',
        phone: patient.phone || '',
        role: 'PATIENT',
        createdAt: now,
        updatedAt: now,
        __v: 0
    };
    mockUsers.push(newPatient);
    return newPatient;
};
const updatePatient = (id, patientData)=>{
    const index = mockUsers.findIndex((user)=>user._id === id);
    if (index === -1) {
        return null;
    }
    const currentUser = mockUsers[index];
    // Kiểm tra trùng lặp với các user khác (không phải chính user này)
    const duplicateErrors = [];
    // Kiểm tra userId nếu thay đổi
    if (patientData.userId && patientData.userId !== currentUser.userId) {
        if (mockUsers.some((user)=>user.userId === patientData.userId)) {
            duplicateErrors.push(`User ID '${patientData.userId}' đã tồn tại`);
        }
    }
    // Kiểm tra username nếu thay đổi
    if (patientData.username && patientData.username !== currentUser.username) {
        if (mockUsers.some((user)=>user.username === patientData.username)) {
            duplicateErrors.push(`Username '${patientData.username}' đã tồn tại`);
        }
    }
    // Kiểm tra email nếu thay đổi
    if (patientData.email && patientData.email !== currentUser.email) {
        if (mockUsers.some((user)=>user.email === patientData.email)) {
            duplicateErrors.push(`Email '${patientData.email}' đã tồn tại`);
        }
    }
    if (duplicateErrors.length > 0) {
        throw new Error(`Không thể cập nhật bệnh nhân: ${duplicateErrors.join(', ')}`);
    }
    // Cập nhật thông tin user
    mockUsers[index] = {
        ...currentUser,
        ...patientData,
        updatedAt: new Date().toISOString()
    };
    return mockUsers[index];
};
const deletePatient = (id)=>{
    const index = mockUsers.findIndex((user)=>user._id === id);
    if (index !== -1) {
        const deletedPatient = mockUsers[index];
        mockUsers.splice(index, 1);
        return deletedPatient;
    }
    return null;
};
const addQueue = (patientId, status = 'waiting')=>{
    // Kiểm tra xem patientId có tồn tại và là bệnh nhân không
    const patient = getUserById(patientId);
    if (!patient || patient.role !== 'PATIENT') {
        console.error('Invalid patient ID or user is not a patient');
        return null;
    }
    // Kiểm tra xem bệnh nhân đã có trong queue chưa
    const existingQueue = getQueueByPatientId(patientId);
    if (existingQueue) {
        console.warn('Patient already in queue');
        return existingQueue;
    }
    // Tạo queue mới
    const newQueue = {
        _id: `queue_${Date.now()}`,
        patient: patientId,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
    };
    mockQueues.push(newQueue);
    return newQueue;
};
const updateQueueStatus = (queueId, status, doctorId)=>{
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
    if (index !== -1) {
        const updatedQueue = {
            ...mockQueues[index],
            status: status,
            updatedAt: new Date().toISOString()
        };
        // Nếu có doctorId và queue chuyển sang trạng thái in_progress, lưu doctorId vào queue
        if (doctorId && status === 'in_progress') {
            updatedQueue.doctorId = doctorId;
        }
        mockQueues[index] = updatedQueue;
        return mockQueues[index];
    }
    return null;
};
const deleteQueue = (queueId)=>{
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
    if (index !== -1) {
        const deletedQueue = mockQueues[index];
        mockQueues.splice(index, 1);
        return deletedQueue;
    }
    return null;
};
const getWaitingPatients = ()=>{
    const waitingQueues = getQueuesByStatus('waiting');
    return waitingQueues.map((queue)=>{
        const patient = getUserById(queue.patient);
        return {
            queueInfo: queue,
            patientInfo: patient || null
        };
    });
};
const getAllQueuesWithPatientInfo = ()=>{
    return mockQueues.map((queue)=>{
        const patient = getUserById(queue.patient);
        return {
            ...queue,
            patientInfo: patient || null
        };
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/MedicineEntry.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MedicineEntry": (()=>MedicineEntry)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MedicineEntry = ({ medicine, onUpdate, onRemove })=>{
    _s();
    // State để lưu thông tin đơn thuốc
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(medicine.name);
    const [totalPills, setTotalPills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(medicine.totalPills ? medicine.totalPills.toString() : '0');
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(medicine.schedule || '');
    // State để quản lý dropdown
    const [isDropdownOpen, setIsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [availableMedicines, setAvailableMedicines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredMedicines, setFilteredMedicines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Lấy danh sách thuốc từ mockdata
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicineEntry.useEffect": ()=>{
            const medicines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllMedicines"])();
            setAvailableMedicines(medicines);
            setFilteredMedicines(medicines);
            setSearchTerm(name); // Đặt giá trị tìm kiếm ban đầu là tên thuốc hiện tại
        }
    }["MedicineEntry.useEffect"], []);
    // Thêm sự kiện click ngoài để đóng dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicineEntry.useEffect": ()=>{
            const handleClickOutside = {
                "MedicineEntry.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (!target.closest(`#medicine-dropdown-${medicine.id}`)) {
                        setIsDropdownOpen(false);
                    }
                }
            }["MedicineEntry.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "MedicineEntry.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["MedicineEntry.useEffect"];
        }
    }["MedicineEntry.useEffect"], [
        medicine.id
    ]);
    // Cập nhật lại danh sách thuốc được lọc khi nhập term tìm kiếm
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicineEntry.useEffect": ()=>{
            if (searchTerm.trim() === '') {
                setFilteredMedicines(availableMedicines);
            } else {
                const filtered = availableMedicines.filter({
                    "MedicineEntry.useEffect.filtered": (med)=>med.name.toLowerCase().includes(searchTerm.toLowerCase())
                }["MedicineEntry.useEffect.filtered"]);
                setFilteredMedicines(filtered);
            }
        }
    }["MedicineEntry.useEffect"], [
        searchTerm,
        availableMedicines
    ]);
    // Xử lý khi chọn một loại thuốc từ danh sách
    const handleSelectMedicine = (selectedMedicine)=>{
        setName(selectedMedicine.name);
        setIsDropdownOpen(false);
        setSearchTerm(selectedMedicine.name);
        onUpdate({
            ...medicine,
            name: selectedMedicine.name,
            totalPills: parseInt(totalPills) || 0,
            schedule
        });
    };
    // Xử lý thay đổi số lượng và cách dùng
    const handleChange = ()=>{
        onUpdate({
            ...medicine,
            name,
            totalPills: parseInt(totalPills) || 0,
            schedule
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-12 gap-4 items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: `medicine-name-${medicine.id}`,
                            className: "block text-sm font-medium text-gray-800 mb-1",
                            children: "Tên thuốc"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            id: `medicine-dropdown-${medicine.id}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer",
                                    onClick: ()=>setIsDropdownOpen(!isDropdownOpen),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: `medicine-name-${medicine.id}`,
                                            value: searchTerm,
                                            onChange: (e)=>{
                                                setSearchTerm(e.target.value);
                                                setIsDropdownOpen(true);
                                            },
                                            onClick: (e)=>e.stopPropagation(),
                                            placeholder: "Tìm thuốc...",
                                            className: "border-none outline-none focus:ring-0 p-0 w-full text-base text-gray-800"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                            className: "h-5 w-5 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                isDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none border border-gray-200",
                                    children: filteredMedicines.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 text-sm text-gray-600",
                                        children: "Không tìm thấy thuốc"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                        lineNumber: 119,
                                        columnNumber: 19
                                    }, this) : filteredMedicines.map((med)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm text-gray-800",
                                            onClick: ()=>handleSelectMedicine(med),
                                            children: [
                                                med.name,
                                                " - ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 font-medium",
                                                    children: [
                                                        med.price,
                                                        "đ/viên"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, med._id, true, {
                                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                            lineNumber: 122,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: `medicine-total-${medicine.id}`,
                            className: "block text-sm font-medium text-gray-800 mb-1",
                            children: "Tổng số viên"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            id: `medicine-total-${medicine.id}`,
                            value: totalPills,
                            min: 0,
                            onChange: (e)=>{
                                setTotalPills(e.target.value);
                                handleChange();
                            },
                            placeholder: "0",
                            className: "block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-800 placeholder-gray-400 px-3 py-2"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: `medicine-schedule-${medicine.id}`,
                            className: "block text-sm font-medium text-gray-800 mb-1",
                            children: "Lịch uống hàng ngày"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            id: `medicine-schedule-${medicine.id}`,
                            value: schedule,
                            onChange: (e)=>{
                                setSchedule(e.target.value);
                                handleChange();
                            },
                            placeholder: "VD: 1 sáng, 2 trưa, 1 tối",
                            className: "block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-800 placeholder-gray-400 px-3 py-2"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-1 flex items-end justify-end h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onRemove(medicine.id),
                        className: "p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md transition-colors",
                        "aria-label": "Xóa thuốc",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard-doctor/MedicineEntry.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
};
_s(MedicineEntry, "qkSx/1IvX5FBEeKKjEDMvC79FbA=");
_c = MedicineEntry;
var _c;
__turbopack_context__.k.register(_c, "MedicineEntry");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/PatientProfile.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientProfile": (()=>PatientProfile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as PhoneIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPinIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MailIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as MailIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
;
;
const PatientProfile = ({ patient })=>{
    const formatPhoneNumber = (phone)=>{
        // Format Vietnamese phone number: 0912 345 678 or +84 912 345 678
        if (phone.startsWith('+84')) {
            return phone.replace(/(\+84)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
        }
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };
    if (!patient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-gray-50 rounded-lg text-gray-500 text-sm",
            children: "Không có thông tin bệnh nhân"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center text-sm text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                className: "h-4 w-4 mr-2 text-gray-600"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: "ID:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 27,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    patient.userId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center text-sm text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__["PhoneIcon"], {
                                className: "h-4 w-4 mr-2 text-gray-600"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: "Số điện thoại:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `tel:${patient.phone}`,
                                        className: "text-blue-600 hover:text-blue-800",
                                        children: formatPhoneNumber(patient.phone)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start text-sm text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MailIcon$3e$__["MailIcon"], {
                                className: "h-4 w-4 mr-2 mt-1 text-gray-600 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: "Email:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `mailto:${patient.email}`,
                                        className: "text-blue-600 hover:text-blue-800",
                                        children: patient.email
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start text-sm text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinIcon$3e$__["MapPinIcon"], {
                                className: "h-4 w-4 mr-2 mt-1 text-gray-600 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: "Ngày tạo:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    new Date(patient.createdAt).toLocaleDateString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard-doctor/PatientProfile.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
};
_c = PatientProfile;
var _c;
__turbopack_context__.k.register(_c, "PatientProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DiagnosisPanel": (()=>DiagnosisPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardListIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$MedicineEntry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/MedicineEntry.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/PatientProfile.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const DiagnosisPanel = ({ patient, queueInfo, onMarkAsDone })=>{
    _s();
    const [diagnosis, setDiagnosis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [prescription, setPrescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [followUp, setFollowUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [followUpDate, setFollowUpDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DiagnosisPanel.useEffect": ()=>{
            // Reset form fields when patient changes
            setDiagnosis('');
            setPrescription([]);
            setFollowUp(false);
            setFollowUpDate('');
            setError(null);
        }
    }["DiagnosisPanel.useEffect"], [
        patient
    ]);
    const canComplete = diagnosis.trim() !== '' && prescription.length > 0;
    const handleComplete = ()=>{
        if (diagnosis.trim() === '') {
            setError('Vui lòng nhập thông tin chẩn đoán');
            return;
        }
        if (prescription.length === 0) {
            setError('Vui lòng thêm ít nhất một loại thuốc');
            return;
        }
        setError(null);
        if (queueInfo) onMarkAsDone(queueInfo._id);
    };
    const handleSave = (e)=>{
        e.preventDefault();
        if (!patient || !queueInfo) return;
        // TODO: Implement save functionality with mock data
        console.log('Saving diagnosis:', {
            patientId: queueInfo.patient,
            queueId: queueInfo._id,
            diagnosis,
            prescription,
            followUp,
            followUpDate
        });
        // Cập nhật trạng thái queue
        onMarkAsDone(queueInfo._id);
    };
    const handleAddMedicine = ()=>{
        // Tạo thuốc mới với cấu trúc phù hợp với Medicine từ auth.ts
        const newMedicine = {
            id: Date.now().toString(),
            name: '',
            totalPills: 0,
            schedule: ''
        };
        setPrescription([
            ...prescription,
            newMedicine
        ]);
    };
    const handleUpdateMedicine = (updatedMedicine)=>{
        setPrescription(prescription.map((med)=>med.id === updatedMedicine.id ? updatedMedicine : med));
    };
    const handleRemoveMedicine = (medicineId)=>{
        setPrescription(prescription.filter((med)=>med.id !== medicineId));
    };
    if (!patient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-md h-full flex items-center justify-center p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextIcon$3e$__["FileTextIcon"], {
                        className: "mx-auto h-12 w-12 text-gray-600"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-2 text-sm font-medium text-gray-900",
                        children: "Chưa chọn bệnh nhân"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-700",
                        children: "Vui lòng chọn bệnh nhân từ danh sách chờ để bắt đầu khám"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
            lineNumber: 103,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-gray-200 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-gray-900",
                                children: patient?.fullName || 'Không có tên'
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    patient?.email,
                                    " • ",
                                    patient?.phone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleComplete,
                        disabled: !canComplete,
                        className: `px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${canComplete ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`,
                        children: "Hoàn thành khám"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 overflow-y-auto space-y-6",
                style: {
                    maxHeight: 'calc(100vh - 250px)'
                },
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 text-red-600 font-medium text-base",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-gray-900 flex items-center mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                        className: "h-4 w-4 mr-2 text-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    "Thông tin bệnh nhân"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientProfile"], {
                                patient: patient
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-gray-50 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-gray-900 flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardListIcon$3e$__["ClipboardListIcon"], {
                                        className: "h-4 w-4 mr-2 text-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    "Thông tin khám bệnh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-sm text-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Thời gian chờ:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            ' ',
                                            queueInfo ? `${Math.floor((new Date().getTime() - new Date(queueInfo.createdAt).getTime()) / 60000)} phút` : 'Không xác định'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Trạng thái:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this),
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-medium ${queueInfo?.status === 'waiting' ? 'text-yellow-600' : queueInfo?.status === 'in_progress' ? 'text-blue-600' : queueInfo?.status === 'completed' ? 'text-green-600' : 'text-red-600'}`,
                                                children: queueInfo?.status === 'waiting' ? 'Đang chờ' : queueInfo?.status === 'in_progress' ? 'Đang khám' : queueInfo?.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 157,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Ngày tạo:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this),
                                            ' ',
                                            queueInfo ? new Date(queueInfo.createdAt).toLocaleString() : 'Không xác định'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSave,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "diagnosis",
                                        className: "block text-base font-semibold text-gray-900",
                                        children: "Chẩn đoán"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "diagnosis",
                                        value: diagnosis,
                                        onChange: (e)=>setDiagnosis(e.target.value),
                                        className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-base text-gray-900 placeholder-gray-500",
                                        rows: 3,
                                        placeholder: "Nhập thông tin chẩn đoán chi tiết cho bệnh nhân..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-base font-semibold text-gray-900",
                                                children: "Đơn thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleAddMedicine,
                                                className: "inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer",
                                                children: "Thêm thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 189,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: prescription.map((medicine)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$MedicineEntry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicineEntry"], {
                                                medicine: medicine,
                                                onUpdate: handleUpdateMedicine,
                                                onRemove: handleRemoveMedicine
                                            }, medicine.id, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "followUp",
                                                type: "checkbox",
                                                checked: followUp,
                                                onChange: (e)=>setFollowUp(e.target.checked),
                                                className: "focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded cursor-pointer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "followUp",
                                                className: "ml-2 block text-base font-semibold text-gray-900 cursor-pointer select-none",
                                                children: "Đặt lịch tái khám"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    followUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "followUpDate",
                                                className: "block text-base font-semibold text-gray-900 mb-1",
                                                children: "Ngày tái khám"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                            className: "h-5 w-5 text-gray-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        id: "followUpDate",
                                                        value: followUpDate,
                                                        onChange: (e)=>setFollowUpDate(e.target.value),
                                                        className: "block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-base text-gray-900",
                                                        min: new Date().toISOString().split('T')[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx",
        lineNumber: 116,
        columnNumber: 10
    }, this);
};
_s(DiagnosisPanel, "BgJN9acEuLVk1S+FYpfpXNkzlv8=");
_c = DiagnosisPanel;
var _c;
__turbopack_context__.k.register(_c, "DiagnosisPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/Dashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dashboard": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/PatientList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$DiagnosisPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/DiagnosisPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const Dashboard = ()=>{
    _s();
    // State cho danh sách bệnh nhân đang chờ
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // State cho bệnh nhân được chọn
    const [selectedPatient, setSelectedPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Lấy danh sách bệnh nhân đang chờ khi component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            loadPatients();
        }
    }["Dashboard.useEffect"], []);
    // Hàm để tải danh sách bệnh nhân đang chờ
    const loadPatients = ()=>{
        // Lấy tất cả queue kèm thông tin bệnh nhân
        const queues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllQueuesWithPatientInfo"])();
        // Lọc chỉ lấy những bệnh nhân đang chờ khám (status = 'waiting')
        const waitingPatients = queues.filter((q)=>q.status === 'waiting');
        setPatients(waitingPatients);
    };
    // Xử lý khi chọn bệnh nhân
    const handleSelectPatient = (patient)=>{
        setSelectedPatient(patient);
    };
    // Xử lý khi hoàn thành khám bệnh nhân
    const handleMarkAsDone = (queueId)=>{
        // Cập nhật trạng thái queue thành 'completed'
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateQueueStatus"])(queueId, 'completed');
        // Tải lại danh sách bệnh nhân
        loadPatients();
        // Bỏ chọn bệnh nhân hiện tại
        setSelectedPatient(null);
    };
    // Sắp xếp bệnh nhân theo thời gian chờ giảm dần
    const sortedPatients = [
        ...patients
    ].sort((a, b)=>{
        const waitA = new Date().getTime() - new Date(a.createdAt).getTime();
        const waitB = new Date().getTime() - new Date(b.createdAt).getTime();
        return waitB - waitA;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col lg:flex-row w-full h-full gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-1/3 h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$PatientList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientList"], {
                    patients: sortedPatients,
                    onSelectPatient: handleSelectPatient,
                    selectedPatientId: selectedPatient ? selectedPatient._id : undefined
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/Dashboard.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/Dashboard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-2/3 h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$DiagnosisPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosisPanel"], {
                    patient: selectedPatient?.patientInfo || null,
                    queueInfo: selectedPatient || null,
                    onMarkAsDone: handleMarkAsDone
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/Dashboard.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/Dashboard.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard-doctor/Dashboard.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
};
_s(Dashboard, "nJK7y1Lqv0Y1Ja5iIyK+yMnyHxs=");
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard-doctor/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardDoctor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard-doctor/Dashboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardDoctor() {
    _s();
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardDoctor.useEffect": ()=>{
            if (!isAuthenticated) {
                router.push('/login');
            }
        }
    }["DashboardDoctor.useEffect"], [
        isAuthenticated,
        router
    ]);
    if (!isAuthenticated || !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/page.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard-doctor/page.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-full min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2d$doctor$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dashboard"], {}, void 0, false, {
                    fileName: "[project]/src/app/dashboard-doctor/page.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard-doctor/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard-doctor/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(DashboardDoctor, "9JxyoMQYOaYlrhlDAgf2AlKQOLA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardDoctor;
var _c;
__turbopack_context__.k.register(_c, "DashboardDoctor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_fc00234a._.js.map