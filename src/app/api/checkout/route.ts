// // app/api/checkout/route.ts
// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../db';
// import { Order } from '../../../../model/Order';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY || '');

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     await connectToDatabase();

//     const newOrder = await Order.create(body);

//     await resend.emails.send({
//       from: 'Your Store <onboarding@resend.dev>',
//       to: 'ahteshamahmed402@gmail.com',
//       subject: '🛍️ New Order Received',
//       html: `
//         <h2>New Order from ${body.name}</h2>
//         <p><strong>Email:</strong> ${body.email}</p>
//         <p><strong>Phone:</strong> ${body.phone}</p>
//         <p><strong>Address:</strong> ${body.city}, ${body.state}, ${body.country} - ${body.zip}</p>
//         <h3>Products:</h3>
//         <ul>
//           ${body.products.map((p: any) => `<li>${p.title} - $${p.price} x ${p.quantity}</li>`).join('')}
//         </ul>
//         <p><strong>Total:</strong> $${body.total.toFixed(2)}</p>
//       `
//     });

//     return NextResponse.json({ success: true, trackingId: newOrder._id });
//   } catch (error: any) {
//     console.error("Checkout error:", error.message || error);
//     return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
//   }
// }
