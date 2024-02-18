import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  categoryList: any[];
}

export function CategoryDropDown({ categoryList }: Category) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Choose Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 overflow-auto max-h-[400px]">
        <DropdownMenuLabel>Select Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="">
          {categoryList.map((category) => {
            return category.children.length > 0 ? (
              <DropdownMenuSub key={category._id}>
                <DropdownMenuSubTrigger>
                  <span>{category.name}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="overflow-auto max-h-[400px]">
                    {category.children.map((subcategory: any) => {
                      return subcategory.children.length > 0 ? (
                        <DropdownMenuSub key={subcategory._id}>
                          <DropdownMenuSubTrigger>
                            <span>{subcategory.name}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="overflow-auto max-h-[400px]">
                              {subcategory.children.map(
                                (subsubcategory: any) => {
                                  return (
                                    <DropdownMenuItem key={subsubcategory._id}>
                                      <span>{subsubcategory.name}</span>
                                    </DropdownMenuItem>
                                  );
                                }
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      ) : (
                        <DropdownMenuItem key={subcategory._id}>
                          <span>{subcategory.name}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem key={category._id}>
                <span>{category.name}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
