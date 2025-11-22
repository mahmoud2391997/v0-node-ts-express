
import mongoose, { Schema } from "mongoose";
import { Device, DeviceType, DeviceStatus } from "@/types/models";

const deviceSchema = new Schema<Device>(
  {
    name: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: Object.values(DeviceType)
    },
    status: { 
      type: String, 
      required: true,
      enum: Object.values(DeviceStatus)
    },
    location: { type: String, required: true },
    roomIds: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
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

deviceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const DeviceModel = mongoose.models.Device || mongoose.model<Device>("Device", deviceSchema);
