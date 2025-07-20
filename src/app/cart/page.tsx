"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function Cart() {
  const router = useRouter();
  const [products, setproducts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);

        // ✅ Ensure parsedCart is an array
        if (Array.isArray(parsedCart)) {
          setproducts(parsedCart);
        } else {
          console.error("Cart data is not an array:", parsedCart);
          setproducts([]);
        }
      }
    } catch (error) {
      console.error("Failed to parse cart:", error);
      toast.error("Something went wrong while loading your cart.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  }, []);

  const proceedToCheckout = () => {
    if (products.length > 0) {
      localStorage.setItem("order", JSON.stringify(products));
      localStorage.removeItem("cart");
      router.push("/checkout");
    }
  };

  const notify = () => {
    toast.error("Item removed successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const removeItem = (id: any) => {
    const updatedCart = products.filter((item) => item._id !== id);
    setproducts(updatedCart);

    if (updatedCart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    notify();
  };

  // ✅ Safely calculate total
  const total = Array.isArray(products)
    ? products.reduce(
        (acc, item) => acc + (item.price || 0) * (item.buyQuantity || 1),
        0
      )
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🛒 Your Cart
        </h1>

        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="p-4 flex justify-between items-center border-b flex-wrap gap-4"
            >
              <div className="flex gap-4 items-start">
                {item.image && typeof item.image === "object" && (
                  <Image
                    src={urlFor(item.image).width(300).url()}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                )}

                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-[#24224f]">Price: PKR {item.price}</p>
                  <p className="text-[#24224f]">
                    Quantity: {item.buyQuantity || 1}
                  </p>
                  <p className="text-[#24224f]">Delivery Charges: PKR 200</p>
                  <p className="text-[#24224f] font-bold">
                    Subtotal: PKR{" "}
                    {(item.price * (item.buyQuantity || 1) + 200).toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-[#bc4444] hover:bg-[#bc2222] text-white px-5 py-3 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="mt-6 flex justify-between items-center border-t pt-4 flex-wrap gap-4">
            <h2 className="text-xl font-bold">Total: PKR {total + 200}</h2>
            <button
              onClick={proceedToCheckout}
              className="bg-[#bc4444] hover:bg-[#bc2222] text-white px-6 py-2 rounded-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Cart;
