"use client";
import {
  HomeIcon,
  LogOut,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const MySidebar = () => {
  return (
    <div className="flex flex-col w-[280px] border-r min-h-screen fixed bg-white">
      <div className="flex h-[60px] items-center px-6 bg-white">
        <Link className="flex items-center  gap-2 font-semibold" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">MediShield</span>
        </Link>
      </div>

      <nav className="flex flex-col flex-1  px-4 text-sm font-medium">
        <Link
          className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          href="/dashboard"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/dashboard/orders"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Orders
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/dashboard/products"
        >
          <PackageIcon className="h-4 w-4" />
          Products
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/dashboard/users"
        >
          <UsersIcon className="h-4 w-4" />
          Customers
        </Link>

        <Button
          // push button to the bottom
          className="mt-auto mb-8"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default MySidebar;
