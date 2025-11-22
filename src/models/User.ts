import mongoose, { Schema } from "mongoose";
import { User, UserRole, EmployeeProfile } from "../types/index";
import { UserDocument, EmployeeProfileDocument } from "../types/models";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.VIEWER },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
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

const employeeProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    phone: String,
    avatar: String,
  },
  {
    timestamps: false,
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

export const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export const EmployeeProfileModel = mongoose.models.EmployeeProfile || mongoose.model<EmployeeProfileDocument>("EmployeeProfile", employeeProfileSchema);
