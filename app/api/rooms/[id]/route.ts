
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RoomModel } from "@/models/Room";
import { AuditLogModel } from "@/models/Audit";

export async function GET(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const room = await RoomModel.findById(params.id);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({ error: "Failed to fetch room" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const body = await request.json();
    const updatedRoom = await RoomModel.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: "system",
        action: "update",
        entity: "room",
        entityId: updatedRoom._id,
        meta: {
            ...body
        }
    });

    await auditLog.save();

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const deletedRoom = await RoomModel.findByIdAndDelete(params.id);
    if (!deletedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: "system",
        action: "delete",
        entity: "room",
        entityId: deletedRoom._id,
        meta: {
            ...deletedRoom
        }
    });

    await auditLog.save();

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
