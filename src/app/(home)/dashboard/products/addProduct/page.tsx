import { ProductEditForm } from "@/components/component/product-edit-form";
import { productsData } from "@/data/products";
import React from "react";

const page = () => {
  return (
    <div className="p-8">
      <ProductEditForm />
    </div>
  );
};

export default page;
