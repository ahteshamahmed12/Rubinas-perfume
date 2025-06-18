import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db'; // adjust path if needed
import { Order } from '../../../../model/Order'; // Mongoose schema
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

    // 🧹 Only pick needed fields from each product
    const cleanedProducts = body.products.map((product: any) => ({
      id: product._id || product.id || '',     // in case it comes from Sanity
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    }));

    const newOrder = new Order({
      name: body.name,
      email: body.email,
      address: body.address,
      houseNumber: body.houseNumber,
      products: cleanedProducts,
      total: body.total,
      trackingId,
    });

    await newOrder.save();
    console.log('✅ Order saved');

    const emailResponse = await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: body.email,
      subject: 'Your Order Confirmation',
      html: `
        <p>Thank you for your order, ${body.name}!</p>
        <p>Your tracking ID: <strong>${trackingId}</strong></p>
        <p>Total: <strong>PKR ${body.total}</strong></p>
      `,
    });

    console.log('📧 Email sent:', emailResponse);

    return NextResponse.json({ success: true, trackingId });

  } catch (error) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to place order.' }, { status: 500 });
  }
}
