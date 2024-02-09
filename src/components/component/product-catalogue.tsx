"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "./product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { productsData } from "@/data/products";

export function ProductCatalogue() {
  const data = productsData;
  const router = useRouter();
  return (
    <div className="flex flex-col ">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Product Catalog</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input placeholder="Search..." type="search" />
            <Button
              onClick={() => router.replace("/dashboard/products/addProduct")}
              size="sm"
            >
              Add Product
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 m-8 ">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          {data.map((product) => (
            <ProductCard
              key={product.sku}
              title={product.name}
              description={product.short_description}
              image={
                product.thumbnail_url.startsWith("http")
                  ? product.thumbnail_url
                  : "https://images1.dentalkart.com/media/catalog/product" +
                    product.thumbnail_url
              }
              price={product.price?.minimalPrice}
              slug={product.sku}
            />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
