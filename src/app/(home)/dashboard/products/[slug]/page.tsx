import { ProductDetails } from "@/components/component/product-details";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  return (
    <div className="p-8">
      <ProductDetails />
    </div>
  );
};

export default Page;
