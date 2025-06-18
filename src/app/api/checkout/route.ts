// app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';
import { Order } from '../../../../model/Order';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      city,
      state,
      country,
      zip,
      products,
      total,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !city || !state || !country || !zip || !products?.length || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to DB
    await connectToDatabase();

    // Create new order
    const newOrder = await Order.create({
      name,
      email,
      phone,
      city,
      state,
      country,
      zip,
      products,
      total,
    });

    // Format products list in HTML
    const productsList = products
      .map((p: any) => `<li>${p.title} - PKR ${p.price} x ${p.quantity}</li>`)
      .join('');

    // Send order email
    await resend.emails.send({
      from: 'Your Store <orders@yourdomain.com>', // 🔁 Replace with verified sender from Resend
      to: 'ahteshamahmed402@gmail.com', // or use `email` if you want to notify customer too
      subject: '🛍️ New Order Received',
      html: `
        <h2>New Order from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${city}, ${state}, ${country} - ${zip}</p>
        <h3>Products:</h3>
        <ul>${productsList}</ul>
        <p><strong>Total:</strong> PKR ${Number(total).toFixed(2)}</p>
      `
    });

    return NextResponse.json({ success: true, trackingId: newOrder._id });
  } catch (error: any) {
    console.error('Checkout error:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to place order. Please try again later.' },
      { status: 500 }
    );
  }
}
