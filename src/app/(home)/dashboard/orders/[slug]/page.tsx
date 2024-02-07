import { OrderDetails } from "@/components/component/order-details";
import React from "react";

const page = ({ params: { slug } }: any) => {
  return (
    <div className="p-8">
      <OrderDetails />
    </div>
  );
};

export default page;
