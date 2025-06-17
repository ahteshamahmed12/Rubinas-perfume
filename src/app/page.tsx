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
            stock
          }`,
          {
            props: {
              revalidate: 60,
            },
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
          <div className="text-center text-3xl font-serif font-bold mt-10">
            OUR PRODUCTS
          </div>

          <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6">
            {products.length > 0 ? (
              products.map((list) => (
                <div
                  key={list._id}
                  className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform"
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

                  {/* Button to Navigate to Detail Page */}
                  <Link
                    href={`/Products/${list._id}`}
                    className="block mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 text-white font-semibold rounded-lg px-10 py-3 shadow-lg transition duration-300 ease-in-out text-center max-w-xs mx-auto"
                    aria-label={`View details of ${list.title}`}
                  >
                    VIEW & ADD TO CART
                  </Link>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          <div className="px-4 pt-10 pb-10 text-center">
  <Link href="/Shop" passHref>
    <div className="text-3xl font-serif border border-[#db4444] rounded-sm bg-[#db4444] text-white py-4 cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#db4444] hover:border-[#db4444]">
      SHOW ALL PRODUCTS
    </div>
  </Link>
</div>

          <div className="mt-5">
            <FeedBack />
          </div>
        </main>
      )}
    </>
  );
}
