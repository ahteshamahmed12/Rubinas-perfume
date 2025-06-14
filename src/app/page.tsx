"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loader from "./Components/Loader";
import AnimatedImages from "./Components/AnimatedImages";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import FeedBack from "./Components/Feedback";


interface Product {
  _id: string;
  title: string;
  description: string;
  image: any;
  slug: {
    current: string;
  };
  price: number;
  type: string;
  rating?: number;
  quantity: number;
  stock: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prod: Product[] = await client.fetch(
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
            stock
          }`,{
            props:{
              revalidate:60
            } 
            
          }
        );
        setProducts(prod);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-full">
          <AnimatedImages />
          <div className="text-center text-3xl font-serif  font-bold mt-10">OUR PRODUCTS</div>

          <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6">
            {products.length > 0 ? (
              products.map((list) => (
                <Link href={`/Products/${list._id}`} key={list._id}>
                  <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 cursor-pointer transition-transform">
                    {list.image && (
                      <Image
                        width={400}
                        height={400}
                        src={urlFor(list.image).width(400).url()}
                        alt={list.title}
                        className="w-full object-cover rounded-md lg:h-[400px] pb-3"
                      />
                    )}
                    <h3 className="text-xl font-extrabold mt-2 text-center">{list.title}</h3>
                    <p className="text-black font-semibold text-center pt-2">
                      PKR {list.price}
                    </p>
                    <p className="text-black font-medium text-center pt-1">
                      Quantity : {list.quantity ?? "N/A"}
                    </p>
                    <p className="text-black font-medium text-center pt-1">
                      Stock : {list.stock ?? "N/A"}
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center pt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < (list.rating || 4.5)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "{}");

                        if (cart[list._id]) {
                          cart[list._id].quantity += 1;
                        } else {
                          cart[list._id] = {
                            ...list,
                            quantity: 1,
                          };
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        window.dispatchEvent(new Event("cartUpdated"));
                      }}
                      className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 text-white font-semibold rounded-lg px-10 py-3 shadow-lg transition duration-300 ease-in-out flex justify-center items-center mx-auto max-w-xs w-full sm:max-w-sm"
                      aria-label={`Add ${list.title} to cart`}
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
              <p>No products found.</p>
            )}
          </div>
            
            <div className="mt-5">
              <FeedBack/>
            </div>
         
          
        </main>
      )}
    </>
  );
}
