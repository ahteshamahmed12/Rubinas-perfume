"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { Bounce, toast } from "react-toastify";

interface Review {
  name: string;
  date: string;
  message: string;
  rating: number;
}

interface ProductTabsProps {
  description: string;
  additionalInfo: string;
  reviews: Review[];
  productId: string;
  onReviewSubmit: () => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  additionalInfo,
  reviews,
  productId,
  onReviewSubmit,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newReview = {
      name,
      message,
      rating,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await client
        .patch(productId)
        .setIfMissing({ reviews: [] })
        .append("reviews", [newReview])
        .commit();

      toast.success("Review submitted!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      setName("");
      setMessage("");
      setRating(5);
      onReviewSubmit();
    } catch (err) {
      toast.error("Failed to submit review", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="mt-10">
      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {["description", "additional", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-medium capitalize border-b-2 ${
              activeTab === tab
                ? "border-[#bc4444] text-[#bc4444]"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {tab === "additional" ? "Additional Info" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <p className="text-gray-700">{description || "No description."}</p>
        )}

        {activeTab === "additional" && (
          <p className="text-gray-700">{additionalInfo || "No additional info."}</p>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-md shadow-sm bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{review.name}</span>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="mt-2 text-gray-700">{review.message}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            {/* Leave a review */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 p-6 border rounded-md bg-gray-50 space-y-4"
            >
              <h3 className="text-lg font-semibold">Leave a Review</h3>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <textarea
                placeholder="Your review"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />

              <div>
                <label className="block mb-1 font-medium">Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="p-2 border rounded"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r !== 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#bc4444] text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
