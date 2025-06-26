import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';
import { Order } from '../../../../model/Order';
import { Resend } from 'resend';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

const SHEET_ID = '1hHtXS4blQ2daTvqk9STemGhi5RkGkq4tar8sjY1-vcQ'; // from URL
const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'google-service.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const trackingId = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    // Clean product data
    const cleanedProducts = body.products.map((p: any) => ({
      title: p.title,
      quantity: p.quantity,
      price: p.price,
    }));

    const productList = cleanedProducts
      .map((p: { title: any; quantity: any; }) => `${p.title} (x${p.quantity})`)
      .join(' | ');

    // Save to MongoDB
    await connectToDatabase();
    const newOrder = new Order({
      ...body,
      products: cleanedProducts,
      trackingId,
    });
    await newOrder.save();

    // Save to Google Sheets
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          trackingId,
          body.name,
          body.email,
          body.phone,
          body.address,
          body.city,
          body.state,
          body.zip,
          body.country,
          productList,
          body.total,
        ]],
      },
    });

    // Send Confirmation Email
    await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: [body.email, 'ahteshamahmed402@gmail.com'],
      subject: '🧾 Order Confirmation',
      html: `
        <h2>🧾 Order Confirmed</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Tracking ID:</strong> ${trackingId}</p>
        <ul>
          ${cleanedProducts.map((p: { title: any; quantity: number; price: number; }) => `<li>${p.title} (x${p.quantity}) - PKR ${p.price * p.quantity}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> PKR ${body.total}</p>
        <p>📦 Your address: ${body.address}, House #${body.houseNumber}, ${body.city}, ${body.state}, ${body.zip}</p>
      `,
    });

    return NextResponse.json({ success: true, trackingId });
  } catch (err: any) {
    console.error('❌ Order Error:', err.message || err);
    return NextResponse.json({ error: err.message || 'Order failed' }, { status: 500 });
  }
  
}
