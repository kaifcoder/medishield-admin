"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface VarientsAddTableProps {
  children?: React.ReactNode;
  childProducts: any;
  setChildProducts: any;
}

const childFormSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  sku: z.string().min(2, { message: "sku must be at least 2 characters." }),
  max_sale_qty: z.any(),
  price: z.object({
    minimalPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.any(),
      }),
    }),
    maximalPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.any(),
      }),
    }),
    regularPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.any(),
      }),
    }),
  }),
});

export function VarientsAddTable({
  children,
  childProducts,
  setChildProducts,
}: VarientsAddTableProps) {
  const form = useForm<z.infer<typeof childFormSchema>>({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      max_sale_qty: 0,
      price: {
        minimalPrice: {
          amount: {
            currency: "INR",
            value: 0,
          },
        },
        maximalPrice: {
          amount: {
            currency: "INR",
            value: 0,
          },
        },
        regularPrice: {
          amount: {
            currency: "INR",
            value: 0,
          },
        },
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Product Variants</h3>
        <Button
          onClick={() => {
            let values = form.getValues();
            values.max_sale_qty = parseInt(values.max_sale_qty);
            values.price.minimalPrice.amount.value = parseInt(
              values.price.minimalPrice.amount.value
            );
            setChildProducts([...childProducts, values]);

            form.reset();
          }}
          type="button"
          size="sm"
        >
          Add Variant
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {childProducts.length > 0 && (
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Variant Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
          )}

          <Form {...form}>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Name of product variant"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="SKU of product variant"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                  <FormField
                    control={form.control}
                    name="price.minimalPrice.amount.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="Price" {...field} />
                        </FormControl>
                        <FormDescription>Price</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                  <FormField
                    control={form.control}
                    name="max_sale_qty"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="Stock" {...field} />
                        </FormControl>
                        <FormDescription>Stock</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              {childProducts.map((childProduct: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                    <p>{childProduct.name ? childProduct.name : "No Name"}</p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                    <p>{childProduct.sku ? childProduct.sku : "No SKU"}</p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                    <p>
                      {childProduct.price?.minimalPrice?.amount?.value
                        ? childProduct.price.minimalPrice.amount.value
                        : 0}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                    <p>
                      {childProduct.max_sale_qty
                        ? childProduct.max_sale_qty
                        : 0}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                    <Button
                      onClick={() => {
                        if (childProducts.length === 1) {
                          setChildProducts([]);
                        }

                        setChildProducts(
                          childProducts.filter((_: any, i: any) => i !== index)
                        );
                      }}
                      type="button"
                      size="icon"
                      variant="ghost"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Form>
        </table>
      </div>
    </div>
  );
}
