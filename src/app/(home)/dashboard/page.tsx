"use client";
import Dashboard from "@/components/component/dashboard";
import { DashboardCard } from "@/components/component/dashboard-card";
import { Orders, columns } from "@/components/component/orderdata";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const DashBoard = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };
  useEffect(() => {
    if (!session?.user) {
      router.replace("/");
    }
  }, [session, session?.user, router]);

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
    .reverse()
    .slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl ml-8 mt-8 font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 p-4 gap-4">
        <DashboardCard
          title="Shipped Orders"
          heading="Total Shipped Orders"
          value={orders
            .filter((order: any) => order.orderStatus === "Shipped")
            .length.toString()}
        />
        <DashboardCard
          title="Pending Orders"
          heading="Total Pending Orders"
          value={orders
            .filter((order: any) => order.orderStatus === "Processing")
            .length.toString()}
        />
        <DashboardCard
          title="Revenue"
          heading="Total Revenue"
          value={`₹ ${orders
            .reduce(
              (acc: number, order: any) => acc + order.paymentIntent.amount,
              0
            )
            .toString()}`}
        />
      </div>
      <h1 className="text-2xl ml-8 mt-8 font-semibold">Recent Orders</h1>
      <Dashboard loading={loading} data={data} columns={columns} />
    </div>
  );
};

export default DashBoard;
