"use client";

import { PackageIcon } from "lucide-react";
import BrandCard from "./BrandCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { brands } from "@/data/brands";

export function BrandShowcase() {
  const router = useRouter();
  const data = brands;
  return (
    <div className="flex flex-col">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Brands</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input placeholder="Search..." type="search" />
            <Button size="sm">Add Brand</Button>
          </div>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 p-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
        {data.map((brand) => {
          return (
            <BrandCard
              key={brand.name}
              name={brand.name}
              thumbnail={brand.logo}
            />
          );
        })}
      </div>
    </div>
  );
}
