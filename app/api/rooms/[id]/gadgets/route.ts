
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GadgetModel } from "@/models/Gadget";

export async function GET(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  try {
    const params = await paramsPromise;
    await connectDB();
    const gadgets = await GadgetModel.find({ roomId: params.id });
    return NextResponse.json({ gadgets });
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    return NextResponse.json({ error: "Failed to fetch gadgets" }, { status: 500 });
  }
}
