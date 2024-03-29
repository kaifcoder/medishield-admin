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
import { use, useEffect, useState } from "react";

export function ProductCatalogue() {
  const [products, setProducts] = useState([]) as any;
  const [search, setSearch] = useState("") as any;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchProducts = async (page: any) => {
    setLoading(true);
    const response = await fetch(`/api/product/?page=${page}`);
    const data = await response.json();
    setProducts(data["data"]);
    setTotal(data["count"]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchSearchProducts = async (search: any) => {
    setLoading(true);
    console.log(search);
    const response = await fetch(`/api/productsearch/?search=${search}`);
    const data = await response.json();
    setProducts(data["data"]);
    setTotal(data["count"]);
    setLoading(false);
  };

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
            <Input
              placeholder="Search..."
              type="search"
              onChange={async (e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  fetchSearchProducts(search);
                  setSearch("");
                }
              }}
            />
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
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {products.map((product: any) => (
              <ProductCard
                id={product._id}
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
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
            {
              <div>
                current page: {page} of {Math.ceil(total / 10)}
              </div>
            }
            <PaginationItem>
              <PaginationNext onClick={() => setPage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
