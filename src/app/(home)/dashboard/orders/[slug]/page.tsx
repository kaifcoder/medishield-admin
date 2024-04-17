"use client";

import { OrderDetails } from "@/components/component/order-details";
import React, { useEffect, useState } from "react";

const page = ({ params: { slug } }: any) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrderDetails = async () => {
    setLoading(true);
    const res = await fetch(`/api/orders/${slug}`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setOrderDetails(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrderDetails();
    console.log("fetching orders...");
  }, []);

  console.log(orderDetails);

  return (
    <div className="p-8 h-screen">
      <h1 className="text-2xl font-semibold">Order Details</h1>

      {loading && (
        <div className="flex justify-center h-full items-center">
          <p>Loading...</p>
        </div>
      )}
      {!loading && orderDetails && (
        <div className="p-8">
          <OrderDetails order={orderDetails} />
        </div>
      )}
    </div>
  );
};

export default page;
