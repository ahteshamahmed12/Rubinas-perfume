"use client";

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlFor } from '@/sanity/lib/image';

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  quantity: number;
};

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartPromise = new Promise<void>((resolve, reject) => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const index = cart.findIndex((item: any) => item._id === product._id);

        if (index > -1) {
          cart[index].quantity += quantity;
        } else {
          cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        resolve();
      } catch (error) {
        console.error('Add to cart error:', error);
        reject();
      }
    });

    toast.promise(cartPromise, {
      loading: 'Adding to cart...',
      success: 'Added to cart!',
      error: 'Something went wrong.',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {product?.image && (
        <Image
          src={urlFor(product.image).url()}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-xl hover:scale-105 transition-transform duration-300"
        />
      )}

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-2xl font-semibold mb-4">Quantity: {product.quantity} ml</p>
        <p className="text-2xl font-semibold mb-4">Price: {product.price} PKR</p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-[#bc4444] text-white px-12 py-4 rounded hover:bg-[#bc2222] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
