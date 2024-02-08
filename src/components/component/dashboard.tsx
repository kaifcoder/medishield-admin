"use client";
import { Button } from "@/components/ui/button";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { MoreHorizontalIcon, Package2Icon, User } from "lucide-react";
import { orders } from "@/data/orderData";
import { useRouter } from "next/navigation";

export function Dashboard() {
  const data = orders;
  const router = useRouter();

  return (
    <div className="flex">
      <main className="flex flex-1 w-[500px] flex-col gap-4 p-2 md:gap-8 md:p-6">
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
