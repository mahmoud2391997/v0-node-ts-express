import mongoose, { Schema } from "mongoose";
import { Booking, BookingStatus, BookingHistory } from "../types/index";
import { BookingDocument, BookingHistoryDocument } from "../types/models";

// Import models to ensure they are registered before being used
import "./User";
import "./Room";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.CONFIRMED,
    },
    purpose: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();

        // This handles both populated documents (ret.user.id) and ObjectIds (ret.user).
        if (ret.user) {
          ret.userId = (ret.user.id || ret.user).toString();
        }
        if (ret.room) {
          ret.roomId = (ret.room.id || ret.room).toString();
        }

        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();

        if (ret.user) {
          ret.userId = (ret.user.id || ret.user).toString();
        }
        if (ret.room) {
          ret.roomId = (ret.room.id || ret.room).toString();
        }

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const bookingHistorySchema = new Schema(
  {
    bookingId: { type: String, required: true },
    timestamp: { type: String, required: true },
    changedBy: { type: String, required: true },
    oldStatus: { type: String, required: true },
    newStatus: { type: String, required: true },
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
  },
);


export const BookingModel = mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', bookingSchema);
export const BookingHistoryModel = mongoose.models.BookingHistory || mongoose.model<BookingHistoryDocument>('BookingHistory', bookingHistorySchema);
