// app/api/send-email/route.ts (Next.js App Router)
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, address, productName } = body;

  try {
    const data = await resend.emails.send({
      from: 'Your Store <onboarding@resend.dev>',
      to: email, // You can also send to your own email
      subject: 'Your Perfume Order Confirmation',
      html: `
        <p>Thank you, <strong>${name}</strong> for your order!</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
