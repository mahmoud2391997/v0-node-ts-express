
import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ["light", "ac", "door_lock", "sensor", "projector"]
    },
    status: { 
      type: String, 
      required: true,
      enum: ["on", "off", "error"]
    },
    location: { type: String, required: true },
    roomIds: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

deviceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const DeviceModel = mongoose.models.Device || mongoose.model("Device", deviceSchema);
