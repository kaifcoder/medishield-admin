"use client";
import { ProductDetails } from "@/components/component/product-details";
import React, { useEffect, useState } from "react";

const Page = ({ params: { slug } }: any) => {
  const [product, setproduct] = useState({}) as any;
  const [loading, setLoading] = useState(true);
  console.log(slug);
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(`/api/product/${slug}`);
    const data = await response.json();
    setproduct(data["findProduct"]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    document.title = product.name;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", product.short_description);
  }, [product]);

  return (
    <>
      <head>
        <title>{product.name || "Check out this Product"}</title>
        <meta name="description" content={product.short_description || ""} />
      </head>
      <div className="p-8 h-full flex justify-center">
        {!loading ? (
          <ProductDetails key={product.sku} isView={true} product={product} />
        ) : (
          <div
            className="
        flex h-full items-center justify-center
        "
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
