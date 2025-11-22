import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MaintenanceModel } from "@/models/Maintenance";
import { AuditLogModel } from "@/models/Audit";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const maintenances = await MaintenanceModel.find({}).populate('device room gadget');
    return NextResponse.json({ maintenances });
  } catch (error) {
    console.error("Error fetching maintenances:", error);
    return NextResponse.json({ error: "Failed to fetch maintenances" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const maintenance = new MaintenanceModel(body);
    await maintenance.save();

    const populatedMaintenance = await MaintenanceModel.findById(new mongoose.Types.ObjectId(maintenance._id)).populate('device room gadget');

    const auditLog = new AuditLogModel({
      user: "system",
      action: "create",
      entity: "maintenance",
      entityId: maintenance._id,
      meta: {
        ...body
      }
    });

    await auditLog.save();

    return NextResponse.json(populatedMaintenance, { status: 201 });
  } catch (error: any) {
    console.error("Error creating maintenance:", error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create maintenance" }, { status: 500 });
  }
}
