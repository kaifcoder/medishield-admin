"use client";
import { ProductDetails } from "@/components/component/product-details";
import { Metadata } from "next";
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

  //dynamic meta tags
  useEffect(() => {
    document.title = product.name;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", product.short_description);
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  return (
    <div className="p-8">
      {!loading ? (
        <ProductDetails key={product.sku} product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default Page;
