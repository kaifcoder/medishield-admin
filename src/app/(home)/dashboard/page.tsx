"use client";
import Dashboard from "@/components/component/dashboard";
import { DashboardCard } from "@/components/component/dashboard-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const DashBoard = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };
  useEffect(() => {
    if (!session?.user) {
      router.replace("/");
    }
  }, [session, session?.user, router]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl ml-8 mt-8 font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 p-4 gap-4">
        <DashboardCard
          title="Shipped Orders"
          heading="Total Shipped Orders"
          value="100"
        />
        <DashboardCard
          title="Pending Orders"
          heading="Total Pending Orders"
          value="100"
        />
        <DashboardCard title="users" heading="Total Users" value="50" />
      </div>
      <h1 className="text-2xl ml-8 mt-8 font-semibold">Recent Orders</h1>
      <Dashboard orders={orders} />
    </div>
  );
};

export default DashBoard;
