
import mongoose, { Schema } from "mongoose";
import { Maintenance, MaintenanceStatus } from "@/types/models";

const maintenanceSchema = new Schema<Maintenance>(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: false },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: false },
    gadget: { type: mongoose.Schema.Types.ObjectId, ref: "Gadget", required: false },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: Object.values(MaintenanceStatus) },
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

maintenanceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

maintenanceSchema.pre('validate', function(next) {
  if (!this.device && !this.room && !this.gadget) {
    next(new Error('At least one of device, room, or gadget must be specified.'));
  } else {
    next();
  }
});

export const MaintenanceModel = mongoose.models.Maintenance || mongoose.model<Maintenance>("Maintenance", maintenanceSchema);
