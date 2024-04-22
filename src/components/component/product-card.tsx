"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { AlertDialogDemo } from "./alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "postcss";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  id: string;
  description: string;
  image: string;
  slug: string;
  price: number;
  media_gallery: string[];
  product: any;
  selectedProduct: any;
  setSelectedProduct: any;
}

const ProductCard = ({
  title,
  id,
  description,
  image,
  slug,
  price,
  media_gallery,
  product,
  selectedProduct,
  setSelectedProduct,
}: ProductCardProps) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [isPublished, setIsPublished] = React.useState(product.published);

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
  };

  const handleAction = () => {
    // first delete the images
    try {
      console.log("Deleting images", media_gallery);
      media_gallery.forEach(async (image) => {
        try {
          await edgestore.publicFiles.delete({
            url: image,
          });
        } catch (error) {
          console.log("Error deleting image", error);
        }
      });
      deleteProduct(id);
      toast("Product has been deleted", {
        description: "The product has been removed from the database.",
        closeButton: true,
      });
      router.refresh();
    } catch (error) {
      toast("Error", {
        description: "There was an error deleting the product.",
        closeButton: true,
      });
    }

    console.log("Action has been clicked");
  };

  const handlePublish = async (id: string) => {
    const res = await fetch(`/api/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({ published: !isPublished }),
    });

    const data = await res.json();
    console.log(data);

    console.log("Publishing product", id);
    // turn off the switch
    setIsPublished(!isPublished);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer relative group flex flex-col",
        selectedProduct.includes(id) && "bg-gray-100  shadow-lg "
      )}
    >
      <input
        type="checkbox"
        aria-label="Select product"
        className="
          absolute top-0 right-0 m-2
           h-6 w-6
          "
        checked={selectedProduct.includes(id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedProduct([...selectedProduct, id]);
          } else {
            setSelectedProduct(
              selectedProduct.filter((item: any) => item !== id)
            );
          }
        }}
      />
      <CardContent
        onClick={() => router.push(`/dashboard/products/${slug}`)}
        className={cn(
          "flex flex-col flex-1  space-y-2 mt-4 items-start justify-center"
        )}
      >
        {/* select  */}

        <img
          alt="Image"
          className="aspect-video object-contain rounded-lg overflow-hidden border border-gray-200 w-full dark:border-gray-800"
          height={150}
          src={image}
          width={200}
        />
        <h2 className="text-lg font-bold leading-none">{title}</h2>
        <p className="text-sm text-muted-foreground leading-none">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">₹ {price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 md:flex   items-center hidden  justify-between bg-gray-200">
        <div className="flex items-center space-x-2">
          <Label htmlFor="published">Published</Label>
          <Switch
            id="published"
            checked={isPublished}
            onCheckedChange={() => handlePublish(slug)}
          />
        </div>
        <Button
          onClick={() => router.push(`/dashboard/products/addProduct/${slug}`)}
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
