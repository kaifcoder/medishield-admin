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

export type PopularProducts = {
  _id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  medishield_coins: number;
};

export const popularcolumns: ColumnDef<PopularProducts>[] = [
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
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "sku",
    header: () => <div className="text-right">SKU</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("sku")}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">₹ {row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="w-full text-center">stock</div>,
    cell: ({ row }) => {
      return (
        <div className="flex w-full mx-4 font-medium">
          <p>{row.getValue("stock")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "medishield_coins",
    header: () => <div className="text-right">Medishield Coins</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("medishield_coins")}
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
              onClick={() => navigator.clipboard.writeText(row.original.sku)}
            >
              Copy SKU
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/products/${row.original.sku}`)
              }
            >
              View Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
