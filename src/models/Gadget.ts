
import mongoose, { Schema } from "mongoose";
import { GadgetType, GadgetStatus } from "../types";

const gadgetSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: Object.values(GadgetType),
    },
    status: { 
      type: String, 
      required: true,
      enum: Object.values(GadgetStatus),
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gadgetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const GadgetModel = mongoose.models.Gadget || mongoose.model("Gadget", gadgetSchema);
