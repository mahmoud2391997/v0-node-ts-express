import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { DeviceModel } from "@/src/models/Device";
import { AuditLogModel } from "@/src/models/Audit";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const device = await DeviceModel.findById(id);
    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }
    return NextResponse.json(device);
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json({ error: "Failed to fetch device" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const { name, type, status, location, roomIds } = body;
    const updatedDevice = await DeviceModel.findByIdAndUpdate(id, { name, type, status, location, roomIds }, { new: true, runValidators: true });
    if (!updatedDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: "system",
        action: "update",
        entity: "device",
        entityId: updatedDevice._id,
        meta: {
            ...body
        }
    });

    await auditLog.save();

    return NextResponse.json(updatedDevice);
  } catch (error: any) {
    console.error("Error updating device:", error);

    let errorMessage = "Failed to update device";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((val: any) => val.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const deletedDevice = await DeviceModel.findByIdAndDelete(id);
    if (!deletedDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
        userId: "system",
        action: "delete",
        entity: "device",
        entityId: deletedDevice._id,
        meta: {
            ...deletedDevice
        }
    });

    await auditLog.save();

    return NextResponse.json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json({ error: "Failed to delete device" }, { status: 500 });
  }
}
