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
  setCategory: any;
  handleChange: any;
}

export function CategoryDropDown({
  categoryList,
  setCategory,
  handleChange,
}: Category) {
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
            function handleClick(selectedCategory: any) {
              setCategory(selectedCategory);
              handleChange(selectedCategory.map((item: any) => item));
              console.log("clicked -->" + JSON.stringify(selectedCategory));
            }

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
                                    <DropdownMenuItem
                                      key={subsubcategory._id}
                                      onClick={() =>
                                        handleClick([
                                          {
                                            name: subsubcategory.name,
                                          },
                                          {
                                            name: subcategory.name,
                                          },
                                          {
                                            name: category.name,
                                          },
                                        ])
                                      }
                                    >
                                      <span>{subsubcategory.name}</span>
                                    </DropdownMenuItem>
                                  );
                                }
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      ) : (
                        <DropdownMenuItem
                          key={subcategory._id}
                          onClick={() =>
                            handleClick([
                              {
                                name: subcategory.name,
                              },
                              {
                                name: category.name,
                              },
                            ])
                          }
                        >
                          <span>{subcategory.name}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={category._id}
                onClick={() =>
                  handleClick([
                    {
                      name: category.name,
                    },
                  ])
                }
              >
                <span>{category.name}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
