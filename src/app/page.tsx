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
import { motion, AnimatePresence } from "framer-motion";

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
  gender: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Prevent hydration issues

  useEffect(() => {
    setIsMounted(true);

    const fetchProducts = async () => {
      try {
        const prod: Product[] = await client.fetch(
          `*[_type == "product"][0...3]{
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
            gender
          }`
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

  if (!isMounted) return null; // Avoid hydration error

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-full">
          <AnimatedImages />
          
                    {/* Corrected layout */}
          <motion.h2
            className="text-center text-3xl font-serif font-bold mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
          </motion.h2>
          
          {/* Move the video below the heading */}
          <div className="max-w-3xl mx-auto px-4 my-6">
            <h1 className="text-center text-2xl font-serif font-bold mb-8">VIDEO</h1>
            <video className="w-full h-full aspect-video rounded-lg shadow-lg" typeof="video/mp4" controls src="/rfvideo.mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          
          
          <h1 className="text-center text-2xl font-serif font-bold mb-4">OUR PRODUCTS</h1>

          {/* Product Cards */}
          <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6">
            <AnimatePresence>
              {products.length > 0 ? (
                products.map((list, index) => (
                  <motion.div
                    key={list._id}
                    className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/Products/${list._id}`}>
                      {list.image && (
                        <Image
                          width={400}
                          height={400}
                          src={urlFor(list.image).width(400).url()}
                          alt={list.title}
                          className="w-full object-cover rounded-md lg:h-[400px] pb-3"
                        />
                      )}
                      <h3 className="text-xl font-extrabold mt-2 text-center">
                        {list.title}
                      </h3>
                      <p className="text-black font-semibold text-center pt-2">
                        PKR {list.price}
                      </p>
                      <p className="text-black font-medium text-center pt-1">
                        Quantity : {list.quantity ?? "N/A"} ml
                      </p>
                      <p className="text-black font-medium text-center pt-1">
                        Stock : {list.stock ?? "N/A"}
                      </p>
                      <p className="text-black font-medium text-center pt-1">
                        For : {list.gender.toUpperCase()}
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
                    </Link>

                    {/* View Button */}
                    <Link
                      href={`/Products/${list._id}`}
                      className="block mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 text-white font-semibold rounded-lg px-10 py-3 shadow-lg transition duration-300 ease-in-out text-center max-w-xs mx-auto"
                      aria-label={`View details of ${list.title}`}
                    >
                      VIEW & ADD TO CART
                    </Link>
                  </motion.div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </AnimatePresence>
          </div>

          {/* Show All Button */}
          <motion.div
            className="px-4 pt-10 pb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/Shop" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-3xl font-serif border border-[#db4444] rounded-sm bg-[#db4444] text-white py-4 cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#db4444] hover:border-[#db4444]"
              >
                SHOW ALL PRODUCTS
              </motion.div>
            </Link>
          </motion.div>

          {/* Feedback Section */}
          <div className="mt-5">
            <FeedBack />
           
          </div>
        </main>
      )}
    </>
  );
}
