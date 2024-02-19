"use client";

import React, { useEffect, useState } from "react";

import Dashboard from "@/components/component/dashboard";
import { Orders, columns } from "@/components/component/orderdata";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const data: Orders[] = orders
    .map((order: any) => {
      return {
        _id: order._id,
        email: order.orderby?.email,
        transactionId: order.paymentIntent.id,
        total: order.paymentIntent.amount,
        createdAt: order.createdAt,
        orderStatus: order.orderStatus,
      };
    })
    .reverse();

  return (
    <div>
      <h1 className="text-2xl ml-8 mt-8 font-semibold">ALL Orders</h1>
      <Dashboard loading data={data} columns={columns} />
    </div>
  );
}
