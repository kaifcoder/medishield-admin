"use client";

import { PackageIcon } from "lucide-react";
import BrandCard from "./BrandCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useEffect, useState } from "react";
import { set, z } from "zod";
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
import { SingleImageDropzone } from "./single-image-upload";
import { useEdgeStore } from "@/lib/edgestore";

const formSchema = z.object({
  name: z.string(),
  logourl: z.string(),
});

export function BrandShowcase() {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fetchBrands = async () => {
    setLoading(true);
    const res = await fetch("/api/brands");
    const data = await res.json();
    setBrand(data["data"]);
    setLoading(false);
  };

  const createBrand = async (brand: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/brands", {
        method: "POST",
        body: JSON.stringify(brand),
      });
      const data = await res.json();
      fetchBrands();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logourl: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    createBrand(values);
    toast("Brand has been created", {
      description: "The brand has been added to the showcase.",
      closeButton: true,
    });

    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
    setOpen(false);
  }

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      fetchBrands();
    } else {
      const filteredBrands = brand.filter((b: any) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      );
      setBrand(filteredBrands);
    }
  }, [search]);

  return (
    <div className="flex flex-col">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Brands</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant="default">Add Brand</Button>
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
                            <SingleImageDropzone
                              width={200}
                              height={200}
                              value={file}
                              onChange={async (file) => {
                                setFile(file);
                                if (file) {
                                  const res =
                                    await edgestore.publicFiles.upload({
                                      file,
                                      onProgressChange: (progress) => {
                                        // you can use this to show a progress bar
                                        console.log(progress);
                                        setUploading(true);
                                        if (progress === 100) {
                                          setUploading(false);
                                        }
                                      },
                                    });
                                  form.setValue("logourl", res.url);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a URL for the brand logo.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button disabled={uploading} type="submit">
                      {uploading ? "Uploading..." : "Add Brand"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      {/* search bar */}
      <div className="flex items-center justify-center px-4 mt-2">
        <Input
          type="search"
          placeholder="Search for brands"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4"
        />
      </div>
      <div className="grid sm:grid-cols-2 p-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
        {loading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          brand &&
          brand.length !== 0 &&
          brand.map((b: any) => {
            return <BrandCard key={b.name} name={b.name} thumbnail={b.logo} />;
          })}
      </div>
    </div>
  );
}
