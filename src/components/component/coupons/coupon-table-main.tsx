"use client";

import React, { useState, useEffect } from "react";
import { columns, Coupon } from "./coupon-data";
import CouponTable from "./coupon-table";

type Props = {};

const CouponTableMain = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState([]);

  const fetchCoupons = async () => {
    setLoading(true);
    const res = await fetch("/api/coupons");
    const data = await res.json();

    setCoupon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const data: Coupon[] = coupon.map((coupon: any) => {
    return {
      _id: coupon._id,
      couponCode: coupon.couponCode,
      type: coupon.type,
      discount: coupon.discount,
      minimumCartValue: coupon.minimumCartValue,
      minimumMedishieldCoins: coupon.minimumMedishieldCoins,
      expiryDate: coupon.expiryDate,
      status: coupon.status,
    };
  });

  return (
    <div className="mt-8">
      <CouponTable data={data} loading={loading} columns={columns} />
    </div>
  );
};

export default CouponTableMain;
