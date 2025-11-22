import mongoose, { Schema } from "mongoose";
import { Room, RoomStatus } from "../types/index";
import { RoomDocument } from "../types/models";

const roomSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    floor: { type: Number, required: true },
    status: { type: String, enum: Object.values(RoomStatus), default: RoomStatus.AVAILABLE },
    amenities: [String],
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

export const RoomModel = mongoose.models.Room || mongoose.model<RoomDocument>("Room", roomSchema);
