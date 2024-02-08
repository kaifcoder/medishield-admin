import { OrderDetails } from "@/components/component/order-details";
import { orders } from "@/data/orderData";
import { constants } from "crypto";
import React from "react";

const page = ({ params: { slug } }: any) => {
  const getOrderDetails = () => {
    const order = orders.find((order) => order._id === slug);
    return order;
  };

  const order = getOrderDetails();
  return (
    <div className="p-8">
      <OrderDetails order={order} />
    </div>
  );
};

export default page;
