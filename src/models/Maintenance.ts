
import mongoose, { Schema, Document } from "mongoose";
import { Maintenance } from "../types/index";

export interface MaintenanceDocument extends Maintenance, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const maintenanceSchema = new Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: false },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: false },
    gadget: { type: mongoose.Schema.Types.ObjectId, ref: "Gadget", required: false },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ["pending", "in-progress", "completed"] },
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

maintenanceSchema.pre('validate', function(this: any, next) {
  if (this.device === '') this.device = null;
  if (this.room === '') this.room = null;
  if (this.gadget === '') this.gadget = null;

  if (!this.device && !this.room && !this.gadget) {
    next(new Error('At least one of device, room, or gadget must be specified.'));
  } else {
    next();
  }
});

export const MaintenanceModel = mongoose.models.Maintenance || mongoose.model<MaintenanceDocument>("Maintenance", maintenanceSchema);
