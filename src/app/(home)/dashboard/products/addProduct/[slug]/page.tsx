"use client";
import { ProductEditForm } from "@/components/component/product-edit-form";
import { ProductUpdate } from "@/components/component/product-update";
import React, { useEffect, useState } from "react";

const page = ({ params: { slug } }: any) => {
  const [product, setproduct] = useState({}) as any;
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(`/api/product/${slug}`);
    const data = await response.json();
    setproduct(data["findProduct"]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const values = {
    name: product!.name,
    sku: product!.sku,
    price: {
      minimalPrice: product!.price?.minimalPrice,
      maximalPrice: product!.price?.maximalPrice,
      regularPrice: product!.price?.regularPrice,
    },
    short_description: product!.short_description,
    max_sale_qty: product!.max_sale_qty,
    product_specs: {
      description: product!.product_specs?.description,
      key_specifications: product!.product_specs?.key_specifications,
      packaging: product!.product_specs?.packaging,
      direction_to_use: product!.product_specs?.direction_to_use,
      features: product!.product_specs?.features,
    },
    thumbnail_url: product!.thumbnail_url,
    media_gallery_entries: product?.media_gallery_entries?.map(
      (media: any) => ({
        file: media.file,
      })
    ),
    medishield_coins: product!.medishield_coins,
  };

  return (
    <>
      {loading ? (
        <p className="p-8">Loading product...</p>
      ) : (
        <div className="p-8">
          <ProductUpdate defaultValues={values} />
        </div>
      )}
    </>
  );
};

export default page;
