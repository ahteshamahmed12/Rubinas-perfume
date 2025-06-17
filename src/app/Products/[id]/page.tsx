"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/Components/ProductDetails"; // ✅ Correct
import ProductTabs from "@/app/Components/ProductTabs";

const Page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    const data = await client.fetch(
      `*[_type == "product" && _id == "${params.id}"][0]`
    );
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <main className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <ProductDetails product={product} />
        <ProductTabs
          description={product.description || ""}
          additionalInfo={product.additionalInfo || ""}
          reviews={product.reviews || []}
          productId={product._id}
          onReviewSubmit={fetchProduct} // refresh data on submit
        />
      </div>
    </main>
  );
};

export default Page;
