import ProductShare from "@/components/component/product-share";
import React from "react";

const Page = ({ params: { slug } }: any) => {
  return (
    <>
      <head>
        <title>Product Share</title>
        <meta name="description" content="Product Share" />
      </head>
      <ProductShare params={{ slug }} />
    </>
  );
};

export default Page;
