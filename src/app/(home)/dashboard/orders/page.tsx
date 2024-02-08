import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { orders } from "@/data/orderData";
import { PackageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const router = useRouter();

  const data = orders;

  return (
    <div>
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">All Orders</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input placeholder="Search..." type="search" />
          </div>
        </div>
      </header>
      <main className="flex flex-1  flex-col gap-4 p-4 md:gap-8 md:p-6">
        <h1 className="text-xl font-semibold">All Orders</h1>
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
