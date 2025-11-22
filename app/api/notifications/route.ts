
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/src/lib/mongodb"
import { NotificationModel } from "@/src/models/Notification"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const notifications = await NotificationModel.find({})
    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const notification = await NotificationModel.create(body)
    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    const updatedNotification = await NotificationModel.findByIdAndUpdate(id, body, { new: true })
    if (!updatedNotification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }
    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const deletedNotification = await NotificationModel.findByIdAndDelete(id)
    if (!deletedNotification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Notification deleted successfully" })
  } catch (error) {
    console.error("Error deleting notification:", error)
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 })
  }
}
