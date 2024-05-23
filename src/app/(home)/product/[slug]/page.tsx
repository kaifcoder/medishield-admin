import ProductShare from "@/components/component/product-share";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  const fetchProduct = async () => {
    const response = await fetch(
      `${process.env.API_URL}/api/product/getproductwithid/${slug}`
    );
    const data = await response.json();
    return data;
  };

  const data: any = fetchProduct();

  return (
    <>
      <head>
        <title>Product Share </title>
        <meta name="description" content="Product Share" />
      </head>
      <ProductShare params={{ slug }} />
    </>
  );
};

export default Page;
