"use client";
import { ProductUpdate } from "@/components/component/product-update";
import React, { useEffect, useState } from "react";

const page = ({ params: { slug } }: any) => {
  const [product, setproduct] = useState({}) as any;
  const [loading, setLoading] = useState(true);
  const [childProducts, setChildProducts] = useState([]) as any[];
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(`/api/product/${slug}`);
    const data = await response.json();
    setproduct(data["findProduct"]);
    setLoading(false);
    setChildProducts(data["findProduct"].childProducts);
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const values = {
    name: product!.name,
    sku: product!.sku,
    barcode: product!.barcode,
    price: {
      minimalPrice: product!.price?.minimalPrice,
      maximalPrice: product!.price?.maximalPrice,
      regularPrice: product!.price?.regularPrice,
    },
    categories: product!.categories,
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
    childProducts:
      childProducts.length > 1
        ? childProducts?.map((child: any) => ({
            sku: child.sku,
            name: child.name,
            price: child.price,
            max_sale_qty: child?.max_sale_qty || 0,
          }))
        : [],
  };

  const handleRemoveChildProduct = (index: number) => {
    const newChildProducts = [...childProducts];
    newChildProducts.splice(index, 1); // Remove the child product at the given index
    setChildProducts(newChildProducts);
  };

  const handleAddChildProduct = () => {
    setChildProducts([
      ...childProducts,
      {
        sku: "",
        name: "",
        price: {
          minimalPrice: {
            amount: {
              value: 0,
              currency: "INR",
            },
          },
          maximalPrice: {
            amount: {
              value: 0,
              currency: "INR",
            },
          },
          regularPrice: {
            amount: {
              value: 0,
              currency: "INR",
            },
          },
        },
        max_sale_qty: 0,
      },
    ]);
    values.childProducts.push({
      sku: "",
      name: "",
      price: {
        minimalPrice: {
          amount: {
            value: 0,
            currency: "INR",
          },
        },
        maximalPrice: {
          amount: {
            value: 0,
            currency: "INR",
          },
        },
        regularPrice: {
          amount: {
            value: 0,
            currency: "INR",
          },
        },
      },
      max_sale_qty: 0,
    });
  };

  return (
    <>
      {loading ? (
        <p className="p-8">Loading product...</p>
      ) : (
        <div className="p-8">
          <ProductUpdate
            id={product._id}
            manufacturer={product!.manufacturer}
            defaultValues={values}
            handleRemoveChildProduct={handleRemoveChildProduct}
            handleAddChildProduct={handleAddChildProduct}
            child={childProducts}
            setChild={setChildProducts}
          />
        </div>
      )}
    </>
  );
};

export default page;
