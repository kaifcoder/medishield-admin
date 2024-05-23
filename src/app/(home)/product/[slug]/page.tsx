import ProductShare from "@/components/component/product-share";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  const fetchProduct = async () => {
    const response = await fetch(
      `${process.env.API_URL}/api/product/getproductwithid/${slug}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  fetchProduct();

  return (
    <>
      <head>
        <title>Product Share </title>
      </head>
      <ProductShare params={{ slug }} />
    </>
  );
};

export default Page;
