import { CategoryAddPanel } from "@/components/component/category-add-panel";
import React from "react";

const page = () => {
  const data = categories.categories;
  return (
    <div className="p-8">
      <header>
        <h1 className="text-xl font-semibold">Category</h1>
      </header>
      <CategoryAddPanel />
    </div>
  );
};

export default page;
