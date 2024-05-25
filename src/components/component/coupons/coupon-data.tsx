"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type Coupon = {
  _id: string;
  couponCode: string;
  type: string;
  discount: number;
  minimumCartValue: number;
  minimumMedishieldCoins: number;
  expiryDate: Date;
  status: string;
};

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "couponCode",
    header: () => <div className="">Coupon Code</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("couponCode")}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: () => <div className="">Discount</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("discount")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="">Type</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: () => <div className="">Expiry</div>,
    cell: ({ row }) => (
      <div className=" font-medium">
        {new Date(row.getValue("expiryDate")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "minimumCartValue",
    header: () => <div className="">Minimum Cart Value</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("minimumCartValue")}</div>
    ),
  },
  {
    accessorKey: "minimumMedishieldCoins",
    header: () => <div className="">Required MSC</div>,
    cell: ({ row }) => (
      <div className=" font-medium">
        {row.getValue("minimumMedishieldCoins")}
      </div>
    ),
  },
];
