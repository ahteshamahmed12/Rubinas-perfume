import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';
import { Order } from '../../../../model/Order';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await connectToDatabase();

    const newOrder = await Order.create(body);

    await resend.emails.send({
      from: 'Your Store <onboarding@resend.dev>',
      to: 'ahteshamahmed402@gmail.com', // change to admin email
      subject: '🛍️ New Order Received',
      html: `
        <h2>New Order from ${body.name}</h2>
        <p>Email: ${body.email}</p>
        <p>Phone: ${body.phone}</p>
        <p>Address: ${body.city}, ${body.state}, ${body.country}, ZIP: ${body.zip}</p>
        <h3>Products:</h3>
        <ul>
          ${body.products.map((p: any) => `<li>${p.title} - $${p.price} x ${p.quantity}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${body.total.toFixed(2)}</p>
      `
    });

    return NextResponse.json({ success: true, trackingId: newOrder._id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
