import mongoose, { Schema } from "mongoose";
import { Booking, BookingStatus, BookingHistory } from "@/types/models";

const bookingSchema = new Schema<Booking>(
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

bookingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

bookingSchema.virtual('userId').get(function () {
  return this.user.toString();
});

bookingSchema.virtual('roomId').get(function () {
  return this.room.toString();
});

const bookingHistorySchema = new Schema<BookingHistory>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    timestamp: { type: Date, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    oldStatus: { type: String, required: true },
    newStatus: { type: String, required: true },
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
  },
);

bookingHistorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});


export const BookingModel = mongoose.models.Booking || mongoose.model<Booking>('Booking', bookingSchema);
export const BookingHistoryModel = mongoose.models.BookingHistory || mongoose.model<BookingHistory>('BookingHistory', bookingHistorySchema);
