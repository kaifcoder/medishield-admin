import { ProductDetails } from "@/components/component/product-details";
import { productsData } from "@/data/products";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  const productSlug = slug;
  const product = productsData.filter((product) => product.sku === productSlug);

  return (
    <div className="p-8">
      <ProductDetails key={product[0].sku} product={product[0]} />
    </div>
  );
};

export default Page;
