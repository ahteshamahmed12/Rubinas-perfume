import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../Mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('ecommerce');
    const orders = db.collection('orders');

    const trackingId = new ObjectId().toHexString();

    await orders.insertOne({
      ...data,
      trackingId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, trackingId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Order failed' }, { status: 500 });
  }
}
