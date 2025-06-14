"use client"
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/Components/ProductDetails/page";
import ProductTabs from "@/app/Components/ProductTabs";

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await client.fetch(
    `*[_type == "product" && _id == "${params.id}"][0]`
  );

  return (
    <main className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {product ? (
          <ProductDetails product={product} />
        ) : (
          <p>Product not found.</p>
        )}
      </div>
      <div>
        <ProductTabs description={""} additionalInfo={""} reviews={[]} productId={""} onReviewSubmit={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      </div>
    </main>
  );
};

export default Page;
