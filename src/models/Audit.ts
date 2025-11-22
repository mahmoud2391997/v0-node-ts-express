import mongoose, { Schema, Document } from "mongoose";
import { AuditLog } from "../types/index";

export interface AuditLogDocument extends AuditLog, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const auditLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String, required: true },
    meta: Schema.Types.Mixed,
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

export const AuditLogModel = mongoose.models.AuditLog || mongoose.model<AuditLogDocument>("AuditLog", auditLogSchema);
