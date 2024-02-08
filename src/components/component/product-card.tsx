"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ProductCard = () => {
  const router = useRouter();
  return (
    <Card className="cursor-pointer">
      <CardContent
        onClick={() => router.push(`/dashboard/products/${`slug`}`)}
        className="p-4 flex flex-col gap-2"
      >
        <img
          alt="Image"
          className="aspect-video object-cover rounded-lg overflow-hidden border border-gray-200 w-full dark:border-gray-800"
          height={150}
          src="/placeholder.svg"
          width={200}
        />
        <h2 className="text-lg font-bold leading-none">
          NeatBook Pro 13.3-inch
        </h2>
        <p className="text-sm text-muted-foreground leading-none">
          Stylish, lightweight, and powerful. Perfect for work and play.
        </p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between">
        <Button
          onClick={() => router.push("/dashboard/products/addProduct")}
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => console.log("Delete")}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
