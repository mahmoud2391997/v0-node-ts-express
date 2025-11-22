
import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { UserModel } from "@/src/models/User";
import { AuditLogModel } from "@/src/models/Audit";

export async function GET() {
  try {
    await connectDB();
    const users = await UserModel.find({});
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const newUser = new UserModel(body);
        const savedUser = await newUser.save();

        const auditLog = new AuditLogModel({
          userId: "system",
          action: "create",
          entity: "user",
          entityId: savedUser._id,
          meta: {
            ...body
          }
        });

        await auditLog.save();

        return NextResponse.json({ user: savedUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
