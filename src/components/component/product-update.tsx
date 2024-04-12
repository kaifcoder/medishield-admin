"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
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

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import useDisableNumberInputScroll from "@/hooks/useNumber";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  sku: z.string().min(2, { message: "sku must be at least 2 characters." }),
  barcode: z
    .string()
    .min(2, { message: "barcode must be at least 2 characters." }),
  medishield_coins: z.coerce.number(),
  price: z.object({
    minimalPrice: z.coerce.number().min(0, {
      message: "price must be greater than 0.",
    }),
    maximalPrice: z.coerce.number().min(0, {
      message: "price must be greater than 0.",
    }),
    regularPrice: z.coerce.number().min(0, {
      message: "price must be greater than 0.",
    }),
  }),
  max_sale_qty: z.coerce
    .number()
    .min(0, { message: "stock must be greater than 0." }),
  short_description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  product_specs: z.object({
    description: z.string().min(2, {
      message: "message must be at least 2 characters.",
    }),
    key_specifications: z.string(),
    packaging: z.string(),
    direction_to_use: z.string(),
    features: z.string(),
  }),
  thumbnail_url: z.string().min(2, {
    message: "thumbnail_url must be at least 2 characters.",
  }),
  media_gallery_entries: z
    .array(
      z.object({
        file: z.string(),
      })
    )
    .min(1, { message: "media_gallery_entries must have at least 1 entry." }),
});

interface ProductEditFormProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export function ProductUpdate({ defaultValues }: ProductEditFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      sku: "",
      price: {
        minimalPrice: 0,
        maximalPrice: 0,
        regularPrice: 0,
      },
      max_sale_qty: 0,
      short_description: "",
      product_specs: {
        description: "",
        key_specifications: "",
        packaging: "",
        direction_to_use: "",
        features: "",
      },
      thumbnail_url: "",
      media_gallery_entries: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/product/${values.sku}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    toast.success("Product updated successfully");
    window.location.reload();
  }
  const [loading, setLoading] = useState(false);

  const handleAddImage = (imageUrl: string) => {
    const mediaEntry = { file: imageUrl };
    const currentMediaEntries = form.getValues("media_gallery_entries");
    const updatedMediaEntries = [...currentMediaEntries, mediaEntry];
    form.setValue("media_gallery_entries", updatedMediaEntries);
    console.log(form.getValues("media_gallery_entries"));
  };

  const handleBarcodeChange = () => {
    let interval: NodeJS.Timeout | null = null;
    var barcode = "";
    document.addEventListener("keydown", (e) => {
      if (interval) clearInterval(interval);
      if (e.key === "Enter") {
        e.preventDefault();
        if (barcode) {
          form.setValue("barcode", barcode);
        }
        barcode = "";
        return;
      }
      if (e.key !== "Shift") {
        barcode += e.key;
      }
      interval = setInterval(() => (barcode = ""), 60);
    });
  };

  handleBarcodeChange();

  useDisableNumberInputScroll();

  return (
    <div className="flex flex-col">
      <div className="mx-3">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Add or Update Product</CardTitle>
            <CardDescription>
              Add or update a product in your catalog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a name for the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="#XXXXXXXSKU" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter Product SKU (Stock Keeping Unit)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter Product Barcode (Universal Product Code - UPC)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Short description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price.minimalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price of the product in INR"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medishield_coins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medishield Coins (MSC)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Medishield Coins for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_sale_qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="No. of products in stock"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Thumbnail Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="media_gallery_entries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            id="image"
                            placeholder="Image URL"
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              handleAddImage(
                                (
                                  document.getElementById(
                                    "image"
                                  ) as HTMLInputElement
                                )?.value
                              )
                            }
                          >
                            Add Image
                          </Button>
                        </div>
                      </FormControl>
                      {
                        <div className="flex flex-col gap-2">
                          {form
                            .getValues("media_gallery_entries")
                            .map((image, index) => (
                              <div key={index} className="flex flex-col">
                                <span>{image.file}</span>
                              </div>
                            ))}
                        </div>
                      }
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_specs.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Detail description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_specs.direction_to_use"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction to use</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Detail description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_specs.key_specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Specification</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Detail description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_specs.packaging"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Packaging</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Detail description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_specs.features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Detail description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
