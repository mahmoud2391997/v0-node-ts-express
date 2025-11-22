import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { GadgetModel } from "@/src/models/Gadget";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid gadget ID" }, { status: 400 });
    }
    await connectDB();
    const gadget = await GadgetModel.findById(id);
    if (!gadget) {
      return NextResponse.json({ error: "Gadget not found" }, { status: 404 });
    }
    return NextResponse.json(gadget);
  } catch (error) {
    console.error("Error fetching gadget:", error);
    return NextResponse.json({ error: "Failed to fetch gadget" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid gadget ID" }, { status: 400 });
    }
    await connectDB();
    const { name, type, status, assignedTo } = await request.json();
    const updatedGadget = await GadgetModel.findByIdAndUpdate(id, { name, type, status, assignedTo }, { new: true, runValidators: true });
    if (!updatedGadget) {
      return NextResponse.json({ error: "Gadget not found" }, { status: 404 });
    }
    return NextResponse.json(updatedGadget);
  } catch (error: any) {
    console.error("Error updating gadget:", error);

    let errorMessage = "Failed to update gadget";
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid gadget ID" }, { status: 400 });
    }
    await connectDB();
    const deletedGadget = await GadgetModel.findByIdAndDelete(id);
    if (!deletedGadget) {
      return NextResponse.json({ error: "Gadget not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Gadget deleted successfully" });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    return NextResponse.json({ error: "Failed to delete gadget" }, { status: 500 });
  }
}
