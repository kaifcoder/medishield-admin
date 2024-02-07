import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";
import { Input } from "../ui/input";

export function ProductCatalogue() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Catalog</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input placeholder="Search..." type="search" />
            <Button size="sm">Add Product</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col gap-2">
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
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col gap-2">
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
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col gap-2">
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
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col gap-2">
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
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
