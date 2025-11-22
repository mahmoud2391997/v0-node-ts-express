import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { MaintenanceModel } from "@/src/models/Maintenance";
import { AuditLogModel } from "@/src/models/Audit";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid maintenance ID" }, { status: 400 });
    }

    const maintenance = await MaintenanceModel.findById(id).populate("device room gadget");
    if (!maintenance) {
      return NextResponse.json({ error: "Maintenance record not found" }, { status: 404 });
    }
    return NextResponse.json({ maintenance });
  } catch (error) {
    console.error("Error fetching maintenance record:", error);
    return NextResponse.json({ error: "Failed to fetch maintenance record" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid maintenance ID" }, { status: 400 });
    }

    const body = await request.json();
    const updatedMaintenance = await MaintenanceModel.findByIdAndUpdate(id, body, { new: true }).populate("device room gadget");
    if (!updatedMaintenance) {
      return NextResponse.json({ error: "Maintenance record not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
      userId: "system",
      action: "update",
      entity: "maintenance",
      entityId: id,
      meta: {
        ...body
      }
    });

    await auditLog.save();

    return NextResponse.json({ maintenance: updatedMaintenance });
  } catch (error) {
    console.error("Error updating maintenance record:", error);
    return NextResponse.json({ error: "Failed to update maintenance record" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid maintenance ID" }, { status: 400 });
    }

    const deletedMaintenance = await MaintenanceModel.findByIdAndDelete(id);
    if (!deletedMaintenance) {
      return NextResponse.json({ error: "Maintenance record not found" }, { status: 404 });
    }

    const auditLog = new AuditLogModel({
      userId: "system",
      action: "delete",
      entity: "maintenance",
      entityId: id,
      meta: {
        ...deletedMaintenance.toObject()
      }
    });

    await auditLog.save();

    return NextResponse.json({ message: "Maintenance record deleted successfully" });
  } catch (error) {
    console.error("Error deleting maintenance record:", error);
    return NextResponse.json({ error: "Failed to delete maintenance record" }, { status: 500 });
  }
}
