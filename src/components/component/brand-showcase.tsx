"use client";

import { PackageIcon } from "lucide-react";
import BrandCard from "./BrandCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { brands } from "@/data/brands";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { BRAND, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string(),
  logourl: z.string(),
});

export function BrandShowcase() {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBrands = async () => {
    setLoading(true);
    const res = await fetch("/api/brands");
    const data = await res.json();
    setBrand(data["data"]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logourl: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    toast("Brand has been created", {
      description: "The brand has been added to the showcase.",
      closeButton: true,
    });

    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
    setOpen(false);
  }

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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant="outline">Add Brand</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Brand</DialogTitle>
                  <DialogDescription>
                    Add a new brand to the showcase
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Brand Name" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide a name for the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logourl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="http://www.image.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a URL for the brand logo.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save changes</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 p-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
        {!loading &&
          brand.map((b: any) => {
            return <BrandCard key={b.name} name={b.name} thumbnail={b.logo} />;
          })}
      </div>
    </div>
  );
}
