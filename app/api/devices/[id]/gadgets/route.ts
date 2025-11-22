
import { NextRequest, NextResponse } from 'next/server';
import { Gadget } from '@/src/models/Gadget';
import { connectToDatabase } from '@/src/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deviceId = params.id;

  try {
    const gadgets = await Gadget.find({ deviceId });
    return NextResponse.json({ gadgets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gadgets' }, { status: 500 });
  }
}
