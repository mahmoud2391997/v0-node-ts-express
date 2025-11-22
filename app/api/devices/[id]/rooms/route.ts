
import { NextRequest, NextResponse } from 'next/server';
import { Room } from '@/src/models/Room';
import { Device } from '@/src/models/Device';
import { connectToDatabase } from '@/src/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deviceId = params.id;

  try {
    const device = await Device.findById(deviceId).populate('roomIds');
    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }
    return NextResponse.json({ rooms: device.roomIds }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
