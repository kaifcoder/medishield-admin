"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoreHorizontalIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { OrderDetails } from "@/components/component/order-details";
import { orders } from "@/data/orderData";

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = orders;

  return (
    <div className="flex ">
      <main className="flex flex-1 w-[500px] flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border  shadow-sm rounded-lg p-2">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="">Order Id</TableHead>
                <TableHead className="min-w-[100px]">Customer</TableHead>
                <TableHead className="hidden md:table-cell">
                  Payment Id
                </TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((order) => {
              return (
                <TableBody key={order._id}>
                  <TableRow>
                    <TableCell className="w-[100px] font-medium">
                      {order._id}
                    </TableCell>
                    <TableCell className="">{order.orderby?.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.paymentIntent.id}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.paymentIntent.amount}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.orderStatus}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/orders/${order._id}`)
                        }
                      >
                        View Order
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </div>
      </main>
    </div>
  );
}
