"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
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

interface ProductCardProps {
  title: string;
  id: string;
  description: string;
  image: string;
  slug: string;
  price: number;
}

const ProductCard = ({
  title,
  id,
  description,
  image,
  slug,
  price,
}: ProductCardProps) => {
  const router = useRouter();

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
  };

  const handleAction = () => {
    deleteProduct(id);
    toast("Product has been deleted", {
      description: "The product has been removed from the database.",
      closeButton: true,
    });

    console.log("Action has been clicked");
  };
  return (
    <Card className="cursor-pointer">
      <CardContent
        onClick={() => router.push(`/dashboard/products/${slug}`)}
        className="p-4 flex flex-col gap-2"
      >
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
      <CardFooter className="p-4 flex items-center justify-between">
        <Button
          onClick={() => router.push(`/dashboard/products/addProduct/${slug}`)}
          size="sm"
          variant="outline"
        >
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
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
