import mongoose, { Schema } from "mongoose";
import { Notification, NotificationType, NotificationStatus, NotificationTemplate, NotificationLog } from "@/types/models";

const notificationSchema = new Schema<Notification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    message: { type: String, required: true },
    status: { type: String, enum: Object.values(NotificationStatus), default: NotificationStatus.SENT },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

notificationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const notificationTemplateSchema = new Schema<NotificationTemplate>(
  {
    key: { type: String, required: true, unique: true },
    content: { type: String, required: true },
  },
  {
    timestamps: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

notificationTemplateSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const notificationLogSchema = new Schema<NotificationLog>(
  {
    notification: { type: Schema.Types.ObjectId, ref: 'Notification', required: true },
    sentAt: { type: Date, required: true },
    providerResponse: { type: String, required: true },
  },
  {
    timestamps: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

notificationLogSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const NotificationModel = mongoose.models.Notification || mongoose.model<Notification>("Notification", notificationSchema);
export const NotificationTemplateModel = mongoose.models.NotificationTemplate || mongoose.model<NotificationTemplate>(
  "NotificationTemplate",
  notificationTemplateSchema,
);
export const NotificationLogModel = mongoose.models.NotificationLog || mongoose.model<NotificationLog>("NotificationLog", notificationLogSchema);
