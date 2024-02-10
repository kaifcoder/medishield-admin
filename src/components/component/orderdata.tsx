"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type Orders = {
  _id: string;
  email?: string;
  transactionId: string;
  total: number;
  createdAt: string;
  orderStatus: string;
};

export const columns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-right">Order Id</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("_id")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "transactionId",
    header: () => <div className="text-right">Transaction Id</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("transactionId")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="w-full text-center">Total</div>,
    cell: ({ row }) => {
      return (
        <div className="flex w-full mx-4 font-medium">
          <p>₹ {row.getValue("total")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("orderStatus")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    accessorKey: "",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.transactionId)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/orders/${row.original._id}`)
              }
            >
              View Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
