import ProductShare from "@/components/component/product-share";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  const fetchProduct = async () => {
    const response = await fetch(`/api/product/${slug}`);
    const data = await response.json();
    return data;
  };

  const data: any = fetchProduct();

  return (
    <>
      <head>
        <title>Product Share {data["findProduct"].name}</title>
        <meta name="description" content="Product Share" />
      </head>
      <ProductShare params={{ slug }} />
    </>
  );
};

export default Page;
