import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import connectToDatabase from '../../../db';
import { Order } from '../../../model/Order';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, address, houseNumber, products, total } = req.body;

  if (!name || !email || !products?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const trackingId = Math.random().toString(36).substr(2, 9).toUpperCase();

  const orderHtml = `
    <h2>Thank you for your order, ${name}!</h2>
    <p><strong>Tracking ID:</strong> ${trackingId}</p>
    <p><strong>Address:</strong> ${address}, House #${houseNumber}</p>
    <h3>Order Details:</h3>
    ${products.map((p: any) => `
      <div style="margin-bottom:10px;">
        <strong>${p.title}</strong><br/>
        Price: PKR ${p.price}<br/>
        Quantity: ${p.quantity}<br/>
        Subtotal: PKR ${(p.price * p.quantity + 200).toFixed(2)}
      </div>
    `).join('')}
    <p><strong>Total:</strong> PKR ${total.toFixed(2)}</p>
  `;

  try {
    await connectToDatabase();

    // Save to MongoDB
    await Order.create({
      name,
      email,
      address,
      houseNumber,
      products,
      total,
      trackingId,
    });

    // Send emails
    await resend.emails.send({
      from: 'Your Shop <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation - Tracking ID ${trackingId}`,
      html: orderHtml,
    });

    await resend.emails.send({
      from: 'Your Shop <onboarding@resend.dev>',
      to: 'ahteshamahmed402@gmail.com',
      subject: `New Order from ${name}`,
      html: orderHtml,
    });

    res.status(200).json({ success: true, trackingId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order processing failed.' });
  }
}
