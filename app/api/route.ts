export async function GET() {
  return Response.json(
    {
      status: "success",
      message: "API server is running",
      timestamp: new Date().toISOString(),
      endpoints: {
        health: "/api/health",
        users: "/api/users",
        rooms: "/api/rooms",
        devices: "/api/devices",
        bookings: "/api/bookings",
        notifications: "/api/notifications",
      },
    },
    { status: 200 },
  )
}
