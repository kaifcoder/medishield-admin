"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { CategoryDropDown } from "./category-dropdown";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Cross, Delete } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useEffect, useState } from "react";
import useDisableNumberInputScroll from "@/hooks/useNumber";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  sku: z.string().min(2, { message: "sku must be at least 2 characters." }),
  barcode: z.string().min(2, {
    message: "barcode must be at least 2 characters.",
  }),
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
  medishield_coins: z.coerce.number(),
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
  categories: z.array(
    z.object({
      name: z.string(),
    })
  ),
  manufacturer: z
    .string()
    .min(2, { message: "brand must be at least 2 characters." }),
});

interface ProductEditFormProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export function ProductEditForm({ defaultValues }: ProductEditFormProps) {
  // 1. Use `useForm` to create a form instance.
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
      categories: [],
      manufacturer: "",
      medishield_coins: 0,
    },
  });
  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      form.reset();
      setImages([]);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Error in adding product");
    }
  }
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<[]>([]);

  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const handleAddImage = (imageUrl: string) => {
    const mediaEntry = { file: imageUrl };
    const currentMediaEntries = form.getValues("media_gallery_entries");
    const updatedMediaEntries = [...currentMediaEntries, mediaEntry];
    form.setValue("media_gallery_entries", updatedMediaEntries);
    console.log(form.getValues("media_gallery_entries"));
  };

  const handleAddCategory = (category: any) => {
    form.resetField("categories");
    const currentCategories = form.getValues("categories");
    const updatedCategories = [
      ...currentCategories,
      ...category,
      {
        name: form.getValues("manufacturer"),
      },
    ];
    form.setValue("categories", updatedCategories);
    console.log(form.getValues("categories"));
  };

  const fetchBrands = async () => {
    setLoading(true);
    const response = await fetch("/api/brands");
    const data = await response.json();
    console.log(data);
    setLoading(false);
    return data["data"];
  };

  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch("/api/category");
    const data = await response.json();
    console.log(data);
    setLoading(false);
    return data["categories"];
  };

  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });

    fetchCategories().then((data) => {
      setCategories(data);
    });

    console.log(brands);
  }, []);

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
                      <FormLabel>Medishield Coin (MSC)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Provide MedishieldCoin for the product"
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
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[250px] overflow-auto ml-4 justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {!loading && field.value
                                ? brands.find(
                                    (b: any) => b.name === field.value
                                  )?.name
                                : "Select Manufacturer"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px]  p-1">
                          <Command>
                            <CommandInput placeholder="Search brands..." />
                            <CommandEmpty>No brands found.</CommandEmpty>
                            <CommandGroup className="h-[400px] overflow-auto">
                              {!loading &&
                                brands.map((b: any) => (
                                  <CommandItem
                                    value={b.name}
                                    key={b.name}
                                    onSelect={() => {
                                      form.setValue("manufacturer", b.name);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        b.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {b.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <div className="ml-2">
                          {!loading && (
                            <CategoryDropDown
                              categoryList={categories}
                              setCategory={setCategory}
                              handleChange={handleAddCategory}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {category.length > 0 && (
                  <>
                    <div className="flex gap-2">
                      {category.map((cat: any, index) => (
                        <div
                          key={index}
                          className="flex border p-1 rounded-sm shadow-sm"
                        >
                          <span>{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
