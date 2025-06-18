import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';// adjust path if needed
import { Order } from '../../../../model/Order';    // Mongoose schema
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('🔁 Checkout API called');

    const body = await req.json();
    console.log('📦 Request Body:', body);

    await connectToDatabase();
    console.log('✅ Connected to MongoDB');

    const trackingId = Math.floor(100000 + Math.random() * 900000).toString();

    const newOrder = new Order({
      ...body,
      trackingId,
    });

    await newOrder.save();
    console.log('✅ Order saved');

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: body.email,
      subject: 'Your Order Confirmation',
      html: `<p>Thank you for your order, ${body.name}!</p><p>Your tracking ID: ${trackingId}</p>`,
    });

    console.log('📧 Email sent:', emailResponse);

    return NextResponse.json({ success: true, trackingId });

  } catch (error) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to place order.' }, { status: 500 });
  }
}
