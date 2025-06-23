'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import Searchs from '../Components/Searchs';
import product from '@/sanity/schemaTypes/Product';

interface Product {
  quantity:number;
  title: string;
  _id: string;
  stock: string;
  description: string;
  image: any;
  slug: {
    current: string;
  };
  price: number;
  type: string;
  rating?: number;
  gender:string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await client.fetch(
        `*[_type == "product"]{
            _id,
            title,
            description,
            image,
            slug,
            price,
            type,
            rating,
            quantity,
            stock,
            gender,
          }`
      );
      setProducts(data);
      setAllProducts(data); 
    };

    fetchProducts();
  }, []);

  

  return (
    <div className="px-4 py-10">
      <Searchs onSearchResults={(results) => {
        setProducts(results.length > 0 ? results : allProducts);
      }} />

      <div className="text-center text-3xl font-bold mt-10">OUR PRODUCTS</div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/Products/${product._id}`} key={product._id}>
              <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer">
                {product.image && (
                  <Image
                    width={300}
                    height={300}
                    src={urlFor(product.image).width(300).url()}
                    alt={product.title}
                    className="w-full object-cover rounded-md lg:h-[425px] pb-3"
                  />
                )}
                <h3 className="text-xl font-bold text-center mt-2">{product.title}</h3>
                <p className="text-black font-semibold text-center pt-2">Price: {product.price} PKR</p>
                <p className="text-black font-semibold text-center pt-2">Quantity: {product.quantity} ml</p>
                <p className="text-black font-semibold text-center pt-2">Stock: {product.stock}</p>
                <p className="text-black font-semibold text-center pt-2">For: {product.gender}</p>

                <div className="flex justify-center pt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < (product.rating || 5) ? 'text-yellow-400' : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <button
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "{}");

                        if (cart[product._id]) {
                          cart[product._id].quantity += 1;
                        } else {
                          cart[product._id] = {
                            ...product,
                            quantity: 1,
                          };
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        window.dispatchEvent(new Event("cartUpdated"));
                      }}
                      className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 text-white font-semibold rounded-lg px-10 py-3 shadow-lg transition duration-300 ease-in-out flex justify-center items-center mx-auto max-w-xs w-full sm:max-w-sm"
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                      ADD TO CART
                    </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3">No products found.</p>
        )}
      </div>
    </div>
  );
}
