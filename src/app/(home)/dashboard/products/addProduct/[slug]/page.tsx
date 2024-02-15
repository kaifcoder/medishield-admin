import { ProductEditForm } from "@/components/component/product-edit-form";
import { productsData } from "@/data/products";
import { get } from "http";
import React from "react";

const products = productsData;

const getProductDetails = (slug: any) => {
  const product = products.find((product) => product.sku === slug);

  return {
    name: product!.name,
    sku: product!.sku,
    price: {
      minimalPrice: product!.price.minimalPrice,
      maximalPrice: product!.price.maximalPrice,
      regularPrice: product!.price.regularPrice,
    },
    short_description: product!.short_description,
    stock: product!.max_sale_qty,
    product_specs: {
      description: product!.product_specs!.description,
      key_specifications: product!.product_specs!.key_specifications,
      packaging: product!.product_specs!.packaging,
      direction_to_use: product!.product_specs!.direction_to_use,
      features: product!.product_specs!.features,
    },
    thumbnail_url: product!.thumbnail_url,
    media_gallery_entries: product!.media_gallery_entries.map((media) => ({
      file: media.file,
    })),
    categories: product!.categories.map((category) => ({
      name: category.name,
    })),
    manufacturer: product!.manufacturer!,
  };
};

const page = ({ params: { slug } }: any) => {
  return (
    <div className="p-8">
      <ProductEditForm defaultValues={getProductDetails(slug)} />
    </div>
  );
};

export default page;
