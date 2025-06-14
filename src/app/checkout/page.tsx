'use client';

import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    houseNumber: '',
  });

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('order') || '[]');
    setOrderItems(order);
  }, []);

  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity + 200, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Processing...');

    const payload = {
      ...formData,
      products: orderItems,
      total,
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok) {
      setStatus(`✅ Order placed! Tracking ID: ${result.trackingId}`);
      localStorage.removeItem('order');
    } else {
      setStatus('❌ Failed to place order.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Full Name" required className="w-full border p-2 rounded" />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required className="w-full border p-2 rounded" />
        <input name="address" onChange={handleChange} placeholder="Address" required className="w-full border p-2 rounded" />
        <input name="houseNumber" onChange={handleChange} placeholder="House Number" required className="w-full border p-2 rounded" />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {orderItems.map((item, idx) => (
            <div key={idx} className="p-4 border mb-2 rounded-lg bg-slate-50">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p>Price: PKR {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Delivery Charges: PKR 200</p>
              <p className="font-semibold">Subtotal: PKR {(item.price * item.quantity + 200).toFixed(2)}</p>
            </div>
          ))}
          <h3 className="text-lg font-bold mt-4">Total: PKR {total.toFixed(2)}</h3>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
          Place Order
        </button>
      </form>

      {status && <p className="mt-4 text-center font-medium">{status}</p>}
    </div>
  );
}
