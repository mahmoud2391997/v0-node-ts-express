import { Document } from "mongoose";
import { User, EmployeeProfile, Room, Booking, BookingHistory, Maintenance, Notification, AuditLog, Device } from "./index";

export interface UserDocument extends User, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeProfileDocument extends EmployeeProfile, Document {
  id: string;
}

export interface RoomDocument extends Room, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingDocument extends Booking, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingHistoryDocument extends BookingHistory, Document {
  id: string;
}

export interface MaintenanceDocument extends Maintenance, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationDocument extends Notification, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLogDocument extends AuditLog, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceDocument extends Device, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}