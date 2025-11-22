
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { BookingModel } from "@/src/models/Booking";
import { AuditLogModel } from "@/src/models/Audit";

export async function GET(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const booking = await BookingModel.findById(params.id).populate("user").populate("room");
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id:string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const body = await request.json();
    const updatedBooking = await BookingModel.findByIdAndUpdate(params.id, body, { new: true }).populate("user").populate("room");
    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: updatedBooking.user.id,
        action: "update",
        entity: "booking",
        entityId: updatedBooking._id,
        meta: {
            ...body
        }
    });

    await auditLog.save();

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const deletedBooking = await BookingModel.findByIdAndDelete(params.id);
    if (!deletedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: deletedBooking.user.id,
        action: "delete",
        entity: "booking",
        entityId: deletedBooking._id,
        meta: {
            ...deletedBooking
        }
    });

    await auditLog.save();

    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
