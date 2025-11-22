
import mongoose, { Schema } from "mongoose";
import { Gadget, GadgetType, GadgetStatus } from "@/types/models";

const gadgetSchema = new Schema<Gadget>(
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

gadgetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const GadgetModel = mongoose.models.Gadget || mongoose.model<Gadget>("Gadget", gadgetSchema);
