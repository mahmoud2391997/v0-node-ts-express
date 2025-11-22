import mongoose, { Schema, Document } from "mongoose";
import { Notification, NotificationTemplate, NotificationLog } from "../types/index";

export interface NotificationDocument extends Notification, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface NotificationTemplateDocument extends NotificationTemplate, Document {
    id: string;
}
export interface NotificationLogDocument extends NotificationLog, Document {
    id: string;
}

const notificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "push"], required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["sent", "failed"], default: "sent" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const notificationTemplateSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    content: { type: String, required: true },
  },
  {
    timestamps: false,
    toJSON: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const notificationLogSchema = new Schema(
  {
    notificationId: { type: String, required: true },
    sentAt: { type: String, required: true },
    providerResponse: { type: String, required: true },
  },
  {
    timestamps: false,
    toJSON: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const NotificationModel = mongoose.model<NotificationDocument>("Notification", notificationSchema);
export const NotificationTemplateModel = mongoose.model<NotificationTemplateDocument>(
  "NotificationTemplate",
  notificationTemplateSchema,
);
export const NotificationLogModel = mongoose.model<NotificationLogDocument>("NotificationLog", notificationLogSchema);
