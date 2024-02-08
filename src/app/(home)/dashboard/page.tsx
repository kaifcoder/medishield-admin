"use client";
import { Dashboard } from "@/components/component/dashboard";
import { DashboardCard } from "@/components/component/dashboard-card";
import React from "react";

const DashBoard = () => {
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
      <Dashboard />
    </div>
  );
};

export default DashBoard;
