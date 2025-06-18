import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';
import { Order } from '../../../../model/Order';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { writeToPath } from 'fast-csv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('🔁 Checkout API called');
    const body = await req.json();
    console.log('📦 Request Body:', body);

    const trackingId = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    // ✅ Clean product data
    const cleanedProducts = body.products.map((p: any) => ({
      id: p._id || p.id || '',
      title: p.title,
      price: p.price,
      quantity: p.quantity,
    }));

    // ✅ 1. Save to MongoDB
    await connectToDatabase();
    const newOrder = new Order({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      houseNumber: body.houseNumber,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
      products: cleanedProducts,
      total: body.total,
      trackingId,
    });
    await newOrder.save();
    console.log('✅ Saved to MongoDB');

    // ✅ 2. Save to CSV
    const csvRow = {
      Timestamp: timestamp,
      'Tracking ID': trackingId,
      Name: body.name,
      Email: body.email,
      Phone: body.phone,
      Address: body.address || '',
      'House No.': body.houseNumber || '',
      City: body.city,
      State: body.state,
      ZIP: body.zip,
      Country: body.country,
      Products: cleanedProducts.map((p: { title: any; quantity: any; }) => `${p.title} (x${p.quantity})`).join(' | '),
      'Total (PKR)': body.total,
    };

    const filePath = path.join(process.cwd(), 'orders.csv');
    const fileExists = fs.existsSync(filePath);
    const rows = fileExists ? [csvRow] : [csvRow];

    await new Promise<void>((resolve, reject) => {
      writeToPath(filePath, rows, {
        headers: !fileExists,
        writeHeaders: !fileExists,
        includeEndRowDelimiter: true,
        quoteColumns: true,
      })
        .on('error', reject)
        .on('finish', resolve);
    });
    console.log('✅ Saved to CSV');

    // ✅ 3. Email (Optional)
    await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: body.email,
      subject: 'Your Order Confirmation',
      html: `
        <p>Thank you for your order, ${body.name}!</p>
        <p><strong>Tracking ID:</strong> ${trackingId}</p>
        <p><strong>Total:</strong> PKR ${body.total}</p>
      `,
    });

    return NextResponse.json({ success: true, trackingId });
  } catch (error) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to process order.' }, { status: 500 });
  }
}
