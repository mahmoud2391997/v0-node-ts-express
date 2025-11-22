import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DeviceModel } from "@/models/Device";
import { AuditLogModel } from "@/models/Audit";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const devices = await DeviceModel.find({});
    return NextResponse.json({ devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, type, status, location, roomIds } = body;
    const device = new DeviceModel({ name, type, status, location, roomIds });
    await device.save();

    const auditLog = new AuditLogModel({
        user: "system",
        action: "create",
        entity: "device",
        entityId: device._id,
        meta: {
            ...body
        }
    });

    await auditLog.save();

    return NextResponse.json(device, { status: 201 });
  } catch (error: any) {
    console.error("Error creating device:", error);

    let errorMessage = "Failed to create device";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((val: any) => val.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
