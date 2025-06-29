'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    city: '',
    state: '',
    zip: '',
    address: '',
    houseNumber: '',
  });

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('order') || '[]');
    setOrderItems(order);
  }, []);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 200;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    try {
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
    } catch (error) {
      console.error(error);
      setStatus('❌ Something went wrong.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid lg:grid-cols-2 gap-10 mt-10">
      {/* Left Side - Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow border">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        <div className="flex gap-4">
          <button type="button" className="w-1/2 border p-2 rounded bg-[#bc4444] text-white font-medium">Delivery</button>
        </div>

        <input name="name" onChange={handleChange} placeholder="Full Name" required className="w-full border p-2 rounded" />
        <input name="email" type="email" onChange={handleChange} placeholder="Email Address" required className="w-full border p-2 rounded" />
        <input name="phone" type="tel" onChange={handleChange} placeholder="Phone Number" required className="w-full border p-2 rounded" />

        <select name="country" onChange={handleChange} className="w-full border p-2 rounded">
          <option>Pakistan</option>
          <option>Pakistan</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="city" onChange={handleChange} placeholder="City" required className="border p-2 rounded" />
          <input name="state" onChange={handleChange} placeholder="State" required className="border p-2 rounded" />
          <input name="zip" onChange={handleChange} placeholder="ZIP Code" required className="border p-2 rounded" />
        </div>

        <input name="address" onChange={handleChange} placeholder="Street Address" required className="w-full border p-2 rounded" />
        <input name="houseNumber" onChange={handleChange} placeholder="House Number" required className="w-full border p-2 rounded" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" required />
          I have read and agree to the Terms and Conditions.
        </label>

        <button type="submit" className="bg-[#bc4444] hover:bg-[#bc2222] text-white px-4 py-2 rounded w-full">
          Order Now
        </button>

        {status && <p className="mt-2 text-center text-sm font-medium">{status}</p>}
      </form>

      {/* Right Side - Summary */}
      <div className="bg-gray-50 p-6 rounded shadow border">
        <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
        <div className="space-y-4">
          {orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(200).url()}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="rounded"
                />
              )}
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p>PKR {item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Subtotal</span>
            <span>PKR {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Shipping</span>
            <span>PKR {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Discount</span>
            <span className="text-[#bc4444]">-PKR {discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2">
            <span>Total</span>
            <span>PKR {total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          🔒 Secure Checkout – SSL Encrypted. Your personal and financial information is safe.
        </p>
      </div>
    </div>
  );
}
