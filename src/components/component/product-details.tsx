"use client";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { ImageCarousel } from "./image-carousel";

interface ProductDetailsProps {
  product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  console.log(product);
  return (
    <div className="grid gap-4 lg:gap-12 max-w-6xl px-2  py-6">
      <h1 className="text-3xl font-bold">Product Details</h1>
      <div className="grid gap-2 md:items-start">
        <div className="md:flex md:space-x-20 items-center md:items-start">
          <ImageCarousel
            images={product.media_gallery_entries.map(
              (image: any) => image.file
            )}
          />
          <div className="grid gap-2">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <p className="font-bold">
              SKU <span className="font-medium">{product.sku}</span>
            </p>
            <p className="font-bold">
              Stock <span className="font-medium mr-2">100</span>(
              <span className="text-green-500 500">In Stock</span>)
            </p>
            <div>
              <p>{product.short_description}</p>
            </div>
            <div className="text-3xl font-bold ">
              ₹ {product.price.minimalPrice}.00
            </div>

            <div className="md:flex items-start"></div>
            <h1 className="font-lg font-medium">Listed in Categories</h1>
            {product.categories.map((category: any, index: any) => (
              <p key={index} className="ml-1">
                {category.name}
              </p>
            ))}
          </div>
        </div>

        {product.childProducts.length > 1 && (
          <div>
            <h2 className="font-bold mb-2">Product Varients</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {product.childProducts.map((child: any) => (
                <div
                  key={child?.sku}
                  className="flex border p-2 rounded-md border-neutral-200 shadow-sm space-x-4"
                >
                  <div className="flex space-x-2 items-start">
                    <img
                      src={
                        child.image_url &&
                        child.image_url.startsWith("https://")
                          ? child.image_url
                          : "https://images1.dentalkart.com/media/catalog/product" +
                            child.image_url
                      }
                      alt={child.image_url}
                      className="object-cover  h-20 rounded-md"
                    />
                    <div>
                      <h1 className="font-bold">
                        {child.name}{" "}
                        <span className="font-medium block text-sm">
                          SKU #{child.sku}
                        </span>
                      </h1>
                      <p>{child.short_description}</p>
                      <p className="font-semibold">
                        {" "}
                        ₹ {child.price.minimalPrice.amount.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="more-info">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {product.product_specs.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="more-info">
            <AccordionTrigger>Key Specification</AccordionTrigger>
            <AccordionContent>
              {product.product_specs.key_specifications}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="more-info">
            <AccordionTrigger>Packaging</AccordionTrigger>
            <AccordionContent>
              {product.product_specs.packaging}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="more-info">
            <AccordionTrigger>Direction To Use</AccordionTrigger>
            <AccordionContent>
              {product.product_specs.direction_to_use}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="more-info">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent>
              {product.product_specs.features}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
