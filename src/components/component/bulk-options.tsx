"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { TrashIcon, UnlinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BulkOptionBarProps {
  children?: React.ReactNode;
  products?: any[];
  className?: string;
  selectedProduct?: any;
  setSelectedProduct?: any;
}

export function BulkOptionBar(props: BulkOptionBarProps) {
  const router = useRouter();

  const handleUnpublish = async (selectedProduct: any) => {
    console.log("Unpublish", selectedProduct);
    try {
      const response = await fetch(`/api/product`, {
        method: "PUT",
        body: JSON.stringify({
          operation: "unpublish",
          productIds: selectedProduct,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        toast.success("Selected items have been unpublished successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (selectedProduct: any) => {
    console.log("Publish", selectedProduct);
    try {
      const response = await fetch(`/api/product`, {
        method: "PUT",
        body: JSON.stringify({
          operation: "publish",
          productIds: selectedProduct,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        toast.success("Selected items have been published successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (selectedProduct: any) => {
    console.log("Delete", selectedProduct);

    try {
      const response = await fetch(`/api/product`, {
        method: "PUT",
        body: JSON.stringify({
          operation: "delete",
          productIds: selectedProduct,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        toast.success("Selected items have been deleted successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="h-6 w-6 "
          id="select-all"
          checked={props.selectedProduct.length === props?.products?.length}
          onChange={(e) => {
            if (e.target.checked) {
              console.log(props.products);
              props.setSelectedProduct(
                props.products?.map((product) => product._id)
              );
            } else {
              props.setSelectedProduct([]);
            }
          }}
          aria-label="Select All"
        />
        <Label
          className="text-gray-500 dark:text-gray-400"
          htmlFor="select-all"
        >
          Select All
        </Label>
      </div>
      <div className="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline">
              <UnlinkIcon className="w-4 h-4 mr-2" />
              Publish Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to publish the selected items?
              </AlertDialogTitle>
              <AlertDialogDescription>
                The selected items will be visible to customers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handlePublish(props.selectedProduct);

                  props.setSelectedProduct([]);
                  window.location.reload();
                }}
              >
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline">
              <UnlinkIcon className="w-4 h-4 mr-2" />
              Unpublish Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to unpublish the selected items?
              </AlertDialogTitle>
              <AlertDialogDescription>
                The selected items will no longer be visible to customers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleUnpublish(props.selectedProduct);
                  props.setSelectedProduct([]);
                  window.location.reload();
                }}
              >
                Unpublish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete the selected items?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The selected items will be
                permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(props.selectedProduct);
                  props.setSelectedProduct([]);
                  window.location.reload();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
