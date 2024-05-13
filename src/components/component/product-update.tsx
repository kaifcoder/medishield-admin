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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import dynamic from "next/dynamic";
import { FileState, MultiImageDropzone } from "./multi-image-upload";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDropDown } from "./category-dropdown";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";

const MarkdownEditor = dynamic(() => import("./markdown-editor"), {
  ssr: false,
});

const childFormSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  sku: z.string().min(2, { message: "sku must be at least 2 characters." }),
  max_sale_qty: z.coerce
    .number()
    .min(0, { message: "stock must be greater than 0." }),
  price: z.object({
    minimalPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.coerce.number().int().min(0, {
          message: "price must be greater than 0.",
        }),
      }),
    }),
    maximalPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.coerce.number().min(0, {
          message: "price must be greater than 0.",
        }),
      }),
    }),
    regularPrice: z.object({
      amount: z.object({
        currency: z.string(),
        value: z.coerce.number().min(0, {
          message: "price must be greater than 0.",
        }),
      }),
    }),
  }),
});

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
  categories: z.array(
    z.object({
      name: z.string(),
    })
  ),
  childProducts: z.array(childFormSchema),
});

interface ProductEditFormProps {
  id: string;
  defaultValues?: z.infer<typeof formSchema>;

  manufacturer: any;
  handleRemoveChildProduct: (index: number) => void;
}

export function ProductUpdate({
  defaultValues,
  id,

  handleRemoveChildProduct,
}: ProductEditFormProps) {
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
      childProducts: [],
    },
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState(
    defaultValues?.categories || []
  ) as any;
  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch("/api/category");
    const data = await response.json();
    console.log(data);
    setLoading(false);
    return data["categories"];
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.setValue("price.maximalPrice", values.price.regularPrice);

      console.log(values);
      setLoading(true);
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(values);
      const data = await res.json();
      console.log(data);
      toast.success("Product updated successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update product");
    }
  }

  async function onSaveDraft(values: z.infer<typeof formSchema>) {
    try {
      form.setValue("price.maximalPrice", values.price.regularPrice);

      console.log("Saving draft", {
        ...values,
        published: true,
      });

      // check field validation

      console.log("Form values", values);

      const isValid = formSchema.safeParse(values);
      if (!isValid.success) {
        console.log(isValid.error.errors);
        toast.error("Please fill all required fields");
        return;
      }

      setLoading(true);
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, published: true }),
      });
      const data = await res.json();
      toast.success("Product updated successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update product");
    }
  }
  const [loading, setLoading] = useState(false);

  const [fileStates, setFileStates] = useState<FileState[]>(
    defaultValues?.media_gallery_entries.map(
      (file: { file: string }, index: number) => ({
        key: index.toString(),
        file: file.file.startsWith("http")
          ? file.file
          : "https://images1.dentalkart.com/media/catalog/product" + file.file,
        progress: "COMPLETE",
        url: file.file,
      })
    ) || []
  );
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      console.log(newFileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  function updateFileStateUrl(key: string, url: string) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);

      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.url = url;
      }
      return newFileStates;
    });
  }

  const handleAddImage = (imageUrl: string) => {
    const mediaEntry = { file: imageUrl };
    console.log("Handle ADD Image", imageUrl, mediaEntry);
    const currentMediaEntries = form.getValues("media_gallery_entries");
    const updatedMediaEntries = [...currentMediaEntries, mediaEntry];
    // add images to fileStates
    setFileStates((fileStates) => [
      ...fileStates,
      {
        key: fileStates.length.toString(),
        file: imageUrl,
        progress: "COMPLETE",
        url: imageUrl,
      },
    ]);
    form.setValue("media_gallery_entries", updatedMediaEntries);
    console.log(form.getValues("media_gallery_entries"));
  };

  const handleAddCategory = (category: any) => {
    form.resetField("categories");
    const updatedCategories = [
      ...(defaultValues?.categories || []),
      ...category,
    ];
    form.setValue("categories", updatedCategories);
    console.log(form.getValues("categories"));
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
                  name="price.regularPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Price (MRP)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Product's MRP"
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
                      <FormLabel>Thumbnail</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("thumbnail_url", value);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Thumbnail" />
                          </SelectTrigger>
                          <SelectContent>
                            {form
                              .getValues("media_gallery_entries")
                              .map((entry: any, index: number) => (
                                <SelectItem key={index} value={entry.file}>
                                  <img
                                    alt="thumbnail"
                                    src={
                                      entry.file.startsWith("http")
                                        ? entry.file
                                        : "https://images1.dentalkart.com/media/catalog/product" +
                                          entry.file
                                    }
                                    className="w-10 h-10 object-cover rounded-lg"
                                  />
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
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
                      <FormLabel>Images (Max 8 Images)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex space-x-1 pb-5 border-b border-gray-800">
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
                          <div>OR </div>
                          <MultiImageDropzone
                            value={fileStates}
                            dropzoneOptions={{
                              maxFiles: 8,
                            }}
                            onChange={(files: any) => {
                              setFileStates(files);
                            }}
                            onFilesAdded={async (addedFiles: any) => {
                              setFileStates([...fileStates, ...addedFiles]);
                              console.log(addedFiles);
                              await Promise.all(
                                addedFiles.map(async (addedFileState: any) => {
                                  try {
                                    console.log(
                                      "Uploading file",
                                      addedFileState
                                    );
                                    const res =
                                      await edgestore.publicFiles.upload({
                                        file: addedFileState.file,
                                        onProgressChange: async (progress) => {
                                          updateFileProgress(
                                            addedFileState.key,
                                            progress
                                          );
                                          if (progress === 100) {
                                            await new Promise((resolve) =>
                                              setTimeout(resolve, 1000)
                                            );
                                            updateFileProgress(
                                              addedFileState.key,
                                              "COMPLETE"
                                            );
                                            updateFileStateUrl(
                                              addedFileState.key,
                                              res.url
                                            );
                                            form.setValue(
                                              "media_gallery_entries",
                                              [
                                                ...form.getValues(
                                                  "media_gallery_entries"
                                                ),
                                                { file: res.url },
                                              ]
                                            );
                                            toast.success("Image uploaded");
                                          }
                                        },
                                      });
                                  } catch (err) {
                                    updateFileProgress(
                                      addedFileState.key,
                                      "ERROR"
                                    );
                                  }
                                })
                              );
                            }}
                            onFileRemove={async (removedFile: any) => {
                              // remove image from edgestore
                              try {
                                if (
                                  removedFile.url.startsWith(
                                    "https://files.edgestore.dev/"
                                  )
                                ) {
                                  let res = await edgestore.publicFiles.delete({
                                    url: removedFile.url,
                                  });
                                }

                                setFileStates((fileStates) =>
                                  fileStates.filter(
                                    (fileState) =>
                                      fileState.key !== removedFile.key
                                  )
                                );
                                // remove image from media_gallery_entries

                                // remove image from media_gallery_entries
                                const currentMediaEntries = form.getValues(
                                  "media_gallery_entries"
                                );
                                console.log(currentMediaEntries);
                                const updatedMediaEntries =
                                  currentMediaEntries.filter(
                                    (entry: any) =>
                                      entry.file !== removedFile.url
                                  );
                                form.setValue(
                                  "media_gallery_entries",
                                  updatedMediaEntries
                                );
                                console.log(
                                  "After remove ",
                                  form.getValues("media_gallery_entries")
                                );

                                toast.success("Image removed successfully");
                              } catch (error) {
                                console.error(error);
                                toast.error("Error in removing image");
                              }
                            }}
                          />
                        </div>
                      </FormControl>

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
                {form.getValues("categories").length > 0 && (
                  <>
                    <div className="flex gap-2 flex-wrap">
                      <p className="text-md font-semibold">Categories: </p>
                      {form
                        .getValues("categories")
                        .map((cat: any, index: any) => (
                          <Badge
                            key={index}
                            className="bg-blue-500 text-white text-md"
                          >
                            <span>{cat.name}</span>
                            <XIcon
                              className="w-4 h-4 ml-1 cursor-pointer"
                              onClick={() => {
                                const updatedCategories = form
                                  .getValues("categories")
                                  .filter(
                                    (category: any) =>
                                      category.name !== cat.name
                                  );
                                setCategory(updatedCategories);
                                form.setValue("categories", updatedCategories);
                                console.log(form.getValues());
                              }}
                            />
                          </Badge>
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
                        <MarkdownEditor
                          handleProcedureContentChange={(value: string) => {
                            form.setValue("product_specs.description", value);
                          }}
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
                        <MarkdownEditor
                          handleProcedureContentChange={(value: string) => {
                            form.setValue(
                              "product_specs.direction_to_use",
                              value
                            );
                          }}
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
                        <MarkdownEditor
                          handleProcedureContentChange={(value: string) => {
                            form.setValue(
                              "product_specs.key_specifications",
                              value
                            );
                          }}
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
                        <MarkdownEditor
                          handleProcedureContentChange={(value: string) => {
                            form.setValue("product_specs.packaging", value);
                          }}
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
                        <MarkdownEditor
                          handleProcedureContentChange={(value: string) => {
                            form.setValue("product_specs.features", value);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {defaultValues?.childProducts &&
                  defaultValues?.childProducts?.length > 0 && (
                    <div>
                      <hr />
                      <h1 className="font-semibold text-2xl">
                        Sub/Child Products
                      </h1>
                    </div>
                  )}

                {defaultValues?.childProducts?.map((childProduct, index) => (
                  <Accordion
                    key={index}
                    className="w-full"
                    collapsible
                    type="single"
                  >
                    <AccordionItem value="more-info">
                      <AccordionTrigger>{childProduct.name}</AccordionTrigger>
                      <AccordionContent className="p-2">
                        <FormField
                          key={index}
                          control={form.control}
                          name={`childProducts.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Child Product Name</FormLabel>
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
                          name={`childProducts.${index}.sku`}
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
                          name={`childProducts.${index}.max_sale_qty`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input placeholder="Stock" {...field} />
                              </FormControl>
                              <FormDescription>
                                Stock of the product
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`childProducts.${index}.price.minimalPrice.amount.value`}
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
                        {/* remove button */}

                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveChildProduct(index);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white w-full mt-5"
                        >
                          Remove
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}

                <Button variant="outline" type="submit">
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onSaveDraft(form.getValues());
                  }}
                  className="ml-4"
                >
                  Publish Product
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
