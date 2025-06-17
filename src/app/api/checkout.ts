// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../db'; // Adjust the path as necessary
import { Order } from '../../../model/Order'; // Make sure this points to your actual model file
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, phone, country, city, state, zip, products, total } = req.body;

  try {
    await connectToDatabase();

    // Create order document via Mongoose
    const newOrder = await Order.create({
      name,
      email,
      phone,
      country,
      city,
      state,
      zip,
      products,
      total,
    });

    // Send email via Resend
    await resend.emails.send({
      from: 'Your Store <orders@yourdomain.com>', // make sure this is verified in Resend
      to: 'your-email@example.com',
      subject: '🛍️ New Order Received',
      html: `
        <h2>New Order from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${city}, ${state}, ${zip}, ${country}</p>
        <p><strong>Total:</strong> PKR ${total.toFixed(2)}</p>
        <h3>Products:</h3>
        <ul>
          ${products.map((p: any) => `<li>${p.title} (x${p.quantity}) – PKR ${p.price}</li>`).join('')}
        </ul>
      `,
    });

    return res.status(200).json({ trackingId: newOrder._id });
  } catch (error) {
    console.error('Checkout Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
