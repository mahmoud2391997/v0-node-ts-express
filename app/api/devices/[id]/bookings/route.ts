
import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/src/models/Booking';
import { Device } from '@/src/models/Device';
import { connectToDatabase } from '@/src/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deviceId = params.id;

  try {
    const device = await Device.findById(deviceId);
    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }
    
    const bookings = await Booking.find({ roomId: { $in: device.roomIds } });
    return NextResponse.json({ bookings }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
