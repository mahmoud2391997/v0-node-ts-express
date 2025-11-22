import mongoose, { Schema } from "mongoose";
import { Room } from "@/types/models";
import { RoomStatus } from "@/types";

const roomSchema = new Schema<Room>(
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

roomSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const RoomModel = mongoose.models.Room || mongoose.model<Room>("Room", roomSchema);
