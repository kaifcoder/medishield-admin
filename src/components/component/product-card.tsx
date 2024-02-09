"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { AlertDialogDemo } from "./alert-dialog";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  price: number;
}

const ProductCard = ({
  title,
  description,
  image,
  slug,
  price,
}: ProductCardProps) => {
  const router = useRouter();
  return (
    <Card className="cursor-pointer">
      <CardContent
        onClick={() => router.push(`/dashboard/products/${slug}`)}
        className="p-4 flex flex-col gap-2"
      >
        <Image
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

        <AlertDialogDemo />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
