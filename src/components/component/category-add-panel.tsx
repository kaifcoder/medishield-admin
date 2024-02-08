"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { Delete } from "lucide-react";
import { useState } from "react";

export function CategoryAddPanel() {
  const data = categories.categories;
  const [selectedcategory, setCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  return (
    <div className="flex h-[600px] bg-gray-100 rounded-lg m-8 border-gray-200 border shadow-sm">
      <div className="flex flex-col w-full px-4 py-6 border-r border-gray-500">
        <div className="space-y-2 p-2 overflow-auto">
          <div className="font-bold">Category</div>
          <Input placeholder="Name of category" />
          <Button className=" hover:bg-black">Add Category</Button>
          {data.map((category) => {
            return (
              <div
                key={category.name}
                className={
                  `flex items-center justify-between hover:bg-gray-300 cursor-pointer p-2 rounded-lg transition-all` +
                  (category.name === selectedcategory ? " bg-gray-300" : "")
                }
                onClick={() => setCategory(category.name)}
              >
                <span>{category.name}</span>
                <Button size={"sm"} variant={`destructive`}>
                  <Delete />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full px-4 py-6 border-r border-gray-500">
        <div className="space-y-2 p-2 overflow-auto">
          <div className="font-bold">Subcategory</div>
          <Input placeholder="Name of subcategory" />
          <Button className=" hover:bg-black">Add Subcategory</Button>
          {data.map((category) => {
            if (category.name === selectedcategory) {
              return category.children.map((subcategory) => {
                return (
                  <div
                    key={subcategory._id}
                    className={
                      `flex items-center justify-between hover:bg-gray-300 cursor-pointer p-2 rounded-lg transition-all` +
                      (subcategory.name === selectedSubCategory
                        ? " bg-gray-300"
                        : "")
                    }
                    onClick={() => setSelectedSubCategory(subcategory.name)}
                  >
                    <span>{subcategory.name}</span>
                    <Button size={"sm"} variant={`destructive`}>
                      <Delete />
                    </Button>
                  </div>
                );
              });
            }
          })}
        </div>
      </div>
      <div className="flex flex-col w-full px-4 py-6">
        <div className="space-y-2 p-2 overflow-auto">
          <div className="font-bold">Child Category</div>
          <Input placeholder="Name of child category" />
          <Button className=" hover:bg-black">Add Child Category</Button>

          {data.map((category) => {
            if (category.name === selectedcategory) {
              return category.children.map((subcategory) => {
                if (subcategory.name === selectedSubCategory) {
                  if (subcategory.children.length === 0) {
                    return (
                      <div className="text-gray-500">No child categories</div>
                    );
                  }

                  return subcategory.children.map((childcategory) => {
                    return (
                      <div
                        key={childcategory._id}
                        className="flex items-center justify-between hover:bg-gray-300 cursor-pointer p-2 rounded-lg transition-all"
                      >
                        <span>{childcategory.name}</span>
                        <Button size={"sm"} variant={`destructive`}>
                          <Delete />
                        </Button>
                      </div>
                    );
                  });
                }
              });
            }
          })}
        </div>
      </div>
    </div>
  );
}
