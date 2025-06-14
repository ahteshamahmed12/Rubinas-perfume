'use client';

import React, { useEffect, useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function fetchWishlist() {
      try {
        const res = await axios.get(`/api/wishlist/${userId}`);
        const wishlist = res.data as { products: Product[] };
        const exists = wishlist.products.some((p: Product) => p._id === product._id);
        setIsInWishlist(exists);
      } catch (error) {
        console.error("Error loading wishlist", error);
      }
    }
    fetchWishlist();
  }, [userId, product._id]);

  const toggleWishlist = async () => {
    if (!userId) return alert("Please log in first!");

    try {
      if (isInWishlist) {
        await axios.delete(`/api/wishlist/${userId}?productId=${product._id}`);
        setIsInWishlist(false);
      } else {
        await axios.post(`/api/wishlist/${userId}`, { productId: product._id });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Wishlist update failed", error);
    }
  };

  return (
    <div className="border rounded p-4 relative">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="mt-2 font-bold">{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>

      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 text-red-500"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isInWishlist ? <HeartOff /> : <Heart />}
      </button>
    </div>
  );
}
