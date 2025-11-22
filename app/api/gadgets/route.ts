
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { GadgetModel } from "@/src/models/Gadget";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const gadgets = await GadgetModel.find({});
    return NextResponse.json({ gadgets });
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    return NextResponse.json({ error: "Failed to fetch gadgets" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, type, status, assignedTo } = await request.json();
    const gadget = new GadgetModel({ name, type, status, assignedTo });
    await gadget.save();
    return NextResponse.json(gadget, { status: 201 });
  } catch (error: any) {
    console.error("Error creating gadget:", error);

    let errorMessage = "Failed to create gadget";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((val: any) => val.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
