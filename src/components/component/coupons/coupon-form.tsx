"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { set, z } from "zod";

type Props = {};

const CouponForm = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    couponCode: z.string().min(1),
    type: z.string().min(1),
    discount: z.coerce.number().min(1),
    minimumCartValue: z.coerce.number().min(0),
    minimumMedishieldCoins: z.coerce.number().min(1),
    expiryDate: z.string(),
    status: z.string().min(1),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // default values for the form
      couponCode: "",
      type: "flat",
      discount: 0,
      minimumCartValue: 0,
      minimumMedishieldCoins: 0,
      expiryDate: "",
      status: "active",
    },
  });

  const createNewCoupon = async (data: any) => {
    console.log(data);
    try {
      // create new coupon
      setLoading(true);
      const response = await fetch("/api/coupons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (response.ok) {
        console.log("Coupon created successfully");
        // close the dialog
        toast.success("Coupon created successfully");
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error creating coupon");
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Create Coupon
        </Button>
      </DialogTrigger>

      {/* form to handle creation of new coupons  */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Coupon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createNewCoupon)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="couponCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Coupon Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-x-2">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    {/* flat or percentage */}
                    <select
                      {...field}
                      className="border border-gray-300 rounded-md px-2 py-1"
                      defaultValue="flat"
                    >
                      <option value="flat">Flat</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-1">
              <FormField
                control={form.control}
                name="minimumCartValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Cart Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Minimum Cart Value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minimumMedishieldCoins"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Medishield Coins</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Minimum Medishield Coins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="flex space-x-4 items-center">
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      className="w-50"
                      type="date"
                      placeholder="Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-x-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    {/* select buttons */}
                    <select
                      {...field}
                      className="border border-gray-300 rounded-md px-2 py-1"
                      defaultValue="active"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8">
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button disabled={loading} type="submit">
                  Create Coupon
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponForm;
