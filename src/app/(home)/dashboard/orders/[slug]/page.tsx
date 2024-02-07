import React from "react";

const page = ({ params: { slug } }: any) => {
  return (
    <div>
      <h1>Orders</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default page;
