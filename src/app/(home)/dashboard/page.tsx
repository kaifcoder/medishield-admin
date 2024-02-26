"use client";
import Dashboard from "@/components/component/dashboard";
import { DashboardCard } from "@/components/component/dashboard-card";
import {
  PopularProducts,
  popularcolumns,
} from "@/components/component/mostbought";
import { Orders, columns } from "@/components/component/orderdata";
import PopularProductTable from "@/components/component/popular-product-table";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const DashBoard = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [popularProducts, setPopularProducts] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("orders");

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const fetchPopularProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/product/popular");
    const data = await res.json();
    setPopularProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!session?.user) {
      router.replace("/");
    }
  }, [session, session?.user, router]);

  useEffect(() => {
    fetchOrders();
    fetchPopularProducts();
  }, [view]);

  // add pooling for orders and popular products
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
      fetchPopularProducts();
    }, 20000);
    return () => clearInterval(interval);
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

  const popularProductsData: PopularProducts[] = popularProducts.map(
    (product: any) => {
      return {
        _id: product._id,
        name: product.name,
        sku: product.sku,
        price: product.price.minimalPrice,
        stock: product.max_sale_qty,
        medishield_coins: product.medishield_coins ?? 0,
      };
    }
  );

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
      <Button className="ml-4" onClick={() => setView("products")}>
        View Popular Products
      </Button>
      <Button className="ml-4" onClick={() => setView("orders")}>
        View Recent Orders
      </Button>
      {view === "orders" ? (
        <div>
          <h1 className="text-2xl ml-8 mt-8 font-semibold">Recent Orders</h1>
          <Dashboard loading={loading} data={data} columns={columns} />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl ml-8 mt-8 font-semibold">Popular Products</h1>
          <PopularProductTable
            loading={loading}
            data={popularProductsData}
            columns={popularcolumns}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
