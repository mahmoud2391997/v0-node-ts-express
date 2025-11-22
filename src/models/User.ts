import mongoose, { Schema } from "mongoose";
import { User, UserRole, UserStatus, EmployeeProfile } from "@/types/models";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.VIEWER },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
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

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const employeeProfileSchema = new Schema<EmployeeProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    phone: String,
    avatar: String,
  },
  {
    timestamps: false,
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

employeeProfileSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);
export const EmployeeProfileModel = mongoose.models.EmployeeProfile || mongoose.model<EmployeeProfile>("EmployeeProfile", employeeProfileSchema);
