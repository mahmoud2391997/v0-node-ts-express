module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Cluster44370:rPxVwmau0taAOsUJ@cluster44370.a6jdq.mongodb.net/?authMechanism=SCRAM-SHA-1";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongooseGlobal;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongooseGlobal = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongooseInstance)=>{
            return mongooseInstance;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
}),
"[project]/src/types/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ======================================================
// DOMAIN SOURCE OF TRUTH (Shared Between Frontend/Backend)
// ======================================================
// ---------- ENUMS ----------
__turbopack_context__.s([
    "BookingStatus",
    ()=>BookingStatus,
    "DeviceStatus",
    ()=>DeviceStatus,
    "DeviceType",
    ()=>DeviceType,
    "GadgetStatus",
    ()=>GadgetStatus,
    "GadgetType",
    ()=>GadgetType,
    "RoomStatus",
    ()=>RoomStatus,
    "UserRole",
    ()=>UserRole
]);
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EMPLOYEE"] = "employee";
    UserRole["VIEWER"] = "viewer";
    return UserRole;
}({});
var RoomStatus = /*#__PURE__*/ function(RoomStatus) {
    RoomStatus["AVAILABLE"] = "available";
    RoomStatus["OCCUPIED"] = "occupied";
    RoomStatus["MAINTENANCE"] = "maintenance";
    return RoomStatus;
}({});
var BookingStatus = /*#__PURE__*/ function(BookingStatus) {
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["COMPLETED"] = "completed";
    return BookingStatus;
}({});
var DeviceType = /*#__PURE__*/ function(DeviceType) {
    DeviceType["LIGHT"] = "light";
    DeviceType["AC"] = "ac";
    DeviceType["DOOR_LOCK"] = "door_lock";
    DeviceType["SENSOR"] = "sensor";
    DeviceType["PROJECTOR"] = "projector";
    return DeviceType;
}({});
var DeviceStatus = /*#__PURE__*/ function(DeviceStatus) {
    DeviceStatus["ON"] = "on";
    DeviceStatus["OFF"] = "off";
    DeviceStatus["ERROR"] = "error";
    return DeviceStatus;
}({});
var GadgetType = /*#__PURE__*/ function(GadgetType) {
    GadgetType["PHONE"] = "phone";
    GadgetType["LAPTOP"] = "laptop";
    GadgetType["TABLET"] = "tablet";
    GadgetType["HEADPHONES"] = "headphones";
    GadgetType["OTHER"] = "other";
    return GadgetType;
}({});
var GadgetStatus = /*#__PURE__*/ function(GadgetStatus) {
    GadgetStatus["AVAILABLE"] = "available";
    GadgetStatus["IN_USE"] = "in_use";
    GadgetStatus["MAINTENANCE"] = "maintenance";
    GadgetStatus["RETIRED"] = "retired";
    return GadgetStatus;
}({});
}),
"[project]/src/models/Gadget.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GadgetModel",
    ()=>GadgetModel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-route] (ecmascript)");
;
;
const gadgetSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GadgetType"])
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GadgetStatus"])
    },
    assignedTo: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
gadgetSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
const GadgetModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Gadget || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Gadget", gadgetSchema);
}),
"[project]/app/api/gadgets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Gadget$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Gadget.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const gadgets = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Gadget$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GadgetModel"].find({});
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            gadgets
        });
    } catch (error) {
        console.error("Error fetching gadgets:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch gadgets"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const { name, type, status, assignedTo } = await request.json();
        const gadget = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Gadget$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GadgetModel"]({
            name,
            type,
            status,
            assignedTo
        });
        await gadget.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(gadget, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating gadget:", error);
        let errorMessage = "Failed to create gadget";
        if (error.name === "ValidationError") {
            errorMessage = Object.values(error.errors).map((val)=>val.message).join(", ");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: errorMessage
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a85b43a3._.js.map