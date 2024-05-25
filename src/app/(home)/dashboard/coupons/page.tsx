"use client";
import CouponForm from "@/components/component/coupons/coupon-form";
import CouponTableMain from "@/components/component/coupons/coupon-table-main";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold ">Coupon Management</h1>
          <p className="text-md text-gray-600 mt-2">
            This is the coupon management page. You can manage all your coupons
            here.
          </p>
        </div>
        <div className="mt-4">
          <CouponForm />
        </div>
      </div>

      {/* data table */}
      <CouponTableMain />
    </div>
  );
};

export default page;
