// ======================================================
// DOMAIN SOURCE OF TRUTH (Shared Between Frontend/Backend)
// ======================================================

// ---------- ENUMS ----------
export enum UserRole {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  VIEWER = "viewer",
}

export enum RoomStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
}

export enum BookingStatus {
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum DeviceType {
  LIGHT = "light",
  AC = "ac",
  DOOR_LOCK = "door_lock",
  SENSOR = "sensor",
  PROJECTOR = "projector",
}

export enum DeviceStatus {
  ON = "on",
  OFF = "off",
  ERROR = "error",
}

export enum GadgetType {
  PHONE = "phone",
  LAPTOP = "laptop",
  TABLET = "tablet",
  HEADPHONES = "headphones",
  OTHER = "other",
}

export enum GadgetStatus {
  AVAILABLE = "available",
  IN_USE = "in_use",
  MAINTENANCE = "maintenance",
  RETIRED = "retired",
}

// ---------- BASE ENTITY ----------
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// ---------- USER ----------
export interface User extends BaseEntity {
  name: string
  email: string
  role: UserRole
  status: "active" | "suspended"
}

export interface EmployeeProfile {
  userId: string
  department: string
  jobTitle: string
  phone?: string
  avatar?: string
}

// ---------- ROOM ----------
export interface Room extends BaseEntity {
  name: string
  capacity: number
  floor: number
  status: RoomStatus
  amenities: string[]
}

// ---------- DEVICE ----------
export interface Device extends BaseEntity {
  roomId: string
  name: string
  type: DeviceType
  status: DeviceStatus
  lastUpdate: string
}

// ---------- GADGET ----------
export interface Gadget extends BaseEntity {
  name: string;
  type: GadgetType;
  status: GadgetStatus;
  assignedTo?: string; // userId
}

export interface SmartLight extends Device {
  brightness: number
  color: string
}

export interface AirConditioner extends Device {
  temperature: number
  mode: "cool" | "heat" | "fan"
}

export interface DoorLock extends Device {
  locked: boolean
}

export interface Sensor extends Device {
  readingType: "temperature" | "motion" | "co2"
  value: number
}

// ---------- BOOKING ----------
export interface Booking extends BaseEntity {
  userId: string
  roomId: string
  startTime: string
  endTime: string
  status: BookingStatus
  purpose?: string
}

export interface BookingHistory {
  bookingId: string
  timestamp: string
  changedBy: string
  oldStatus: BookingStatus
  newStatus: BookingStatus
}

// ---------- MAINTENANCE ----------
export interface Maintenance extends BaseEntity {
  device: string;
  description: string;
  date: Date;
  status: string;
}

// ---------- NOTIFICATIONS ----------
export interface Notification extends BaseEntity {
  userId: string
  type: "email" | "sms" | "push"
  message: string
  status: "sent" | "failed"
}

export interface NotificationTemplate {
  id: string
  key: string
  content: string
}

export interface NotificationLog {
  notificationId: string
  sentAt: string
  providerResponse: string
}

// ---------- AUDIT ----------
export interface AuditLog extends BaseEntity {
  userId: string
  action: string
  entity: string
  entityId: string
  meta?: Record<string, any>
}

// ---------- SETTINGS / PERMISSIONS ----------
export interface SystemSetting {
  id: string
  key: string
  value: string | number | boolean
}

export interface Permission {
  id: string
  role: UserRole
  canBookRoom: boolean
  canManageDevices: boolean
  canEditRooms: boolean
  canViewAnalytics: boolean
}

// ---------- ANALYTICS ----------
export interface RoomUsage {
  roomId: string
  date: string
  hoursUsed: number
  bookingCount: number
}

export interface DeviceUsage {
  deviceId: string
  hoursActive: number
}

export interface UserActivity {
  userId: string
  actionsCount: number
  lastActive: string
}

// ---------- API REQUEST / RESPONSE TYPES ----------
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export type CreateBookingRequest = Pick<Booking, "roomId" | "userId" | "startTime" | "endTime" | "purpose">

export type BookingResponse = ApiResponse<Booking>

export type RoomsResponse = ApiResponse<Room[]>

export type DevicesResponse = ApiResponse<Device[]>

export type GadgetsResponse = ApiResponse<Gadget[]>;
