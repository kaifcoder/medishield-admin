import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CategoryAddPanel() {
  return (
    <div className="flex h-[600px] bg-gray-100 rounded-lg m-8 ">
      <div className="flex flex-col w-full px-4 py-6 border-r border-gray-600">
        <div className="space-y-2 overflow-auto">
          <div className="font-bold ">Category</div>
          <Input placeholder="Name of category" />
          <Button className=" hover:bg-blue-700">Add Category</Button>
        </div>
      </div>
      <div className="flex flex-col w-full px-4 py-6 border-r border-gray-600">
        <div className="space-y-2 overflow-auto">
          <div className="font-bold">Subcategory</div>
          <Input placeholder="Name of subcategory" />
          <Button className=" hover:bg-blue-700">Add Subcategory</Button>
        </div>
      </div>
      <div className="flex flex-col w-full px-4 py-6">
        <div className="space-y-2 overflow-auto">
          <div className="font-bold">Child Category</div>
          <Input placeholder="Name of child category" />
          <Button className=" hover:bg-blue-700">Add Child Category</Button>
        </div>
      </div>
    </div>
  );
}
