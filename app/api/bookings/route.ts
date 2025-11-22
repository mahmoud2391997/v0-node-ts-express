
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { BookingModel } from "@/src/models/Booking";
import { AuditLogModel } from "@/src/models/Audit";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const bookings = await BookingModel.find({}).populate("user").populate("room");
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, roomId, startTime, endTime, ...rest } = body;

    if (!userId || !roomId) {
      console.warn("User or room missing from booking request", body);
      return NextResponse.json({ error: "User and room are required fields" }, { status: 400 });
    }

    const existingBooking = await BookingModel.findOne({
      user: userId,
      room: roomId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    if (existingBooking) {
      return NextResponse.json({ error: "A booking with the same details already exists" }, { status: 409 });
    }

    const booking = new BookingModel({
      ...rest,
      user: userId,
      room: roomId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    await booking.save();

    const auditLog = new AuditLogModel({
      userId: userId,
      action: "create",
      entity: "booking",
      entityId: booking._id,
      meta: {
        ...body
      }
    });

    await auditLog.save()

    const populatedBooking = await BookingModel.findById(booking._id).populate("user").populate("room");
    return NextResponse.json(populatedBooking, { status: 201 });
  } catch (error: any) {
    console.error("Error creating booking:", error);

    let errorMessage = "Failed to create booking";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((val: any) => val.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
