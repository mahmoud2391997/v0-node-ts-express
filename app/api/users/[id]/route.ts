import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { UserModel } from "@/src/models/User";
import { AuditLogModel } from "@/src/models/Audit";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const user = await UserModel.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const auditLog = new AuditLogModel({
            userId: "system",
            action: "update",
            entity: "user",
            entityId: updatedUser._id,
            meta: {
                ...body
            }
        });

        await auditLog.save();

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const auditLog = new AuditLogModel({
            userId: "system",
            action: "delete",
            entity: "user",
            entityId: deletedUser._id,
            meta: {
                ...deletedUser
            }
        });

        await auditLog.save();

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
