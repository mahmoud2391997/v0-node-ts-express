import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RoomModel } from "@/models/Room";
import { AuditLogModel } from "@/models/Audit";

export async function GET() {
  try {
    await connectDB();
    const rooms = await RoomModel.find({});
    return NextResponse.json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, capacity, ...rest } = body;

    if (!name || !capacity) {
      console.warn("Name or capacity missing from room request", body);
      return NextResponse.json({ error: "Name and capacity are required fields" }, { status: 400 });
    }

    const existingRoom = await RoomModel.findOne({
      name: name,
    });

    if (existingRoom) {
      return NextResponse.json({ error: "A room with the same name already exists" }, { status: 409 });
    }

    const room = new RoomModel({
      ...rest,
      name: name,
      capacity: capacity,
    });
    await room.save();

    const auditLog = new AuditLogModel({
      user: "system",
      action: "create",
      entity: "room",
      entityId: room._id,
      meta: {
        ...body
      }
    });

    await auditLog.save()

    return NextResponse.json(room, { status: 201 });
  } catch (error: any) {
    console.error("Error creating room:", error);

    let errorMessage = "Failed to create room";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((val: any) => val.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
