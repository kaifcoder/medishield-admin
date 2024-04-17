"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const formSchema = z.object({
  w: z.string(),
  h: z.string(),
  l: z.string(),
  b: z.string(),
});

export function OrderDetails({ order }: any) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      w: "",
      h: "",
      l: "",
      b: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const payload = {
      ...values,
      status: "Shipped",
    };
    console.log(payload);

    const response = await fetch(`/api/orders/${order._id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle the error
      console.error(response.statusText);
      return;
    }

    toast("Order Shipped", {
      description: "The order has been shipped.",
      closeButton: true,
    });

    // ✅ This will be type-safe and validated.
    form.reset();
    setOpen(false);
    // refresh the page
    window.location.reload();
  }

  async function handleCancelOrder() {
    // console.log(id);
    console.log(order._id);

    const response = await fetch(`/api/orders/cancel/${order._id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      // Handle the error
      console.error(response.statusText);
      return;
    }

    toast("Order Cancelled", {
      description: "The order has been cancelled.",
      closeButton: true,
    });

    // refresh the page
    window.location.reload();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
          <CardDescription>
            Order #{order._id} placed by
            <Link className="text-blue-600 underline ml-2" href="#">
              {order.orderby?.firstname} {order.orderby?.lastname}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="font-medium">Order number</div>
            <div>#{order._id}</div>
            <div className="font-medium">Date</div>
            <div>
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="font-medium">Status</div>
            <div>{order.orderStatus}</div>

            <div className="font-medium">Sub Total</div>
            <div>
              ₹{" "}
              {order.paymentIntent?.amount -
                order.paymentIntent?.shipping +
                order.paymentIntent?.msc}
            </div>

            <div className="font-medium">Discount</div>
            <div>₹ {order.paymentIntent?.msc}</div>
            <div className="font-medium">Total after Discount</div>
            <div>
              ₹ {order.paymentIntent?.amount - order.paymentIntent?.shipping}
            </div>
            <div className="font-medium">Shipping Fee</div>
            <div>₹ {order.paymentIntent?.shipping}</div>

            <div className="font-bold">Grand Total</div>
            <div className="font-bold">₹ {order.paymentIntent?.amount}</div>
          </div>
          <div className="flex space-y-2 flex-col justify-start items-start text-sm">
            <div className="flex space-x-4">
              <div className="font-medium">Customer</div>
              <div>
                {order.orderby?.firstname} {order.orderby?.lastname}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="font-medium">Email</div>
              <div>{order.orderby?.email}</div>
            </div>
            <div className="flex space-x-4">
              <div className="font-medium">Phone</div>
              <div>{order.shippingAddress?.mobile}</div>
            </div>
            <div className="flex space-x-4">
              <div className="font-medium">Phone</div>
              <div>{order.shippingAddress?.mobile}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products?.map((product: any) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.product.childProducts.length > 1
                        ? product.product.childProducts.map(
                            (child: any, sku: any) =>
                              child.sku === product.variant
                                ? `${child.name}`
                                : ``
                          )
                        : product.product.name}{" "}
                      #SKU: {product.variant}
                    </TableCell>
                    <TableCell>{product.count}</TableCell>
                    <TableCell>₹ {product?.price}</TableCell>
                    <TableCell>₹ {product?.price * product.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shipping information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="font-medium">Method</div>
            <div>Standard shipping</div>
            <div className="font-medium">Tracking number</div>
            <div>
              {order?.trackingNumber ? order?.trackingNumber : "Not Alloted"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping address</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {order.shippingAddress?.name} - {order.shippingAddress?.mobile}
            <br />
            {order.shippingAddress?.address}
            <br />
            {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
            {order.shippingAddress?.pincode}
            <br />
            {order.shippingAddress?.country}
          </div>
        </CardContent>
      </Card>
      {order.orderStatus === "Processing" && (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-x-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant="default">Mark as Shipped</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ship Order #{order._id}</DialogTitle>
                  <DialogDescription>
                    Provide the tracking number for the order.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="w"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight of Package</FormLabel>
                          <FormControl>
                            <Input placeholder="0.5 Kg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide the weight of the package.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="h"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height of Package</FormLabel>
                          <FormControl>
                            <Input placeholder="10 cm" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide the height of the package.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="l"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length of Package</FormLabel>
                          <FormControl>
                            <Input placeholder="10 cm" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide the length of the package.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="b"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breadth of Package</FormLabel>
                          <FormControl>
                            <Input placeholder="10 cm" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide the breadth of the package.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save changes</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will refund all the money
                    and order will be discarded.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleCancelOrder()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}
    </>
  );
}
