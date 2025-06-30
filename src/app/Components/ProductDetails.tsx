"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlFor } from '@/sanity/lib/image';

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  quantity: number; // this is the product bottle size e.g. 100ml
  gender: string;
  stock: string;
};

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1); // user-selected purchase quantity
  const router = useRouter();

  const handleAddToCart = () => {
    const cartPromise = new Promise<void>((resolve, reject) => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const index = cart.findIndex((item: any) => item._id === product._id);

        if (index > -1) {
          cart[index].buyQuantity += quantity; // ✅ Correct key
        } else {
          cart.push({ ...product, buyQuantity: quantity }); // ✅ Correct key
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
      success: () => {
        router.push('/cart'); // ✅ Redirect to cart after adding
        return 'Added to cart!';
      },
      error: 'Something went wrong.',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 p-6">
      {product?.image && (
        <Image
          src={urlFor(product.image).url()}
          alt={product.title}
          width={450}
          height={450}
          className="rounded-xl hover:scale-105 transition-transform duration-300"
        />
      )}

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg mb-4">{product.description}</p>

        <p className="pb-6 text-3xl font-bold pt-4">DETAILS</p>
        <p className="text-2xl font-semibold mb-4">
          For: {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
        </p>
        <p className="text-2xl font-semibold mb-4">Stock: {product.stock}</p>
        <p className="text-2xl font-semibold mb-4">Price: {product.price} PKR</p>
        <p className="text-2xl font-semibold mb-4">Quantity: {product.quantity} ml</p>

        <p className="pb-6 text-3xl font-bold pt-4">SET PRODUCT QUANTITY</p>
        <div className="flex items-center gap-4 mb-10">
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
