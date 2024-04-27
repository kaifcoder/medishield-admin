"use client";

import { Button } from "@/components/ui/button";
import { FileEditIcon, ToggleRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { z } from "zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function PromotionalBanners() {
  const formSchema = z.object({
    title: z.string(),
    mobile_image: z.string(),
    id: z.string(),
  });

  const [banners, setBanners] = useState([]) as any;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  async function fetchBanners() {
    try {
      setLoading(true);
      const response = await fetch("/api/banners");
      const data = await response.json();
      console.log(data);
      setBanners(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      mobile_image: "",
      id: "",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Promotion Banners</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!loading && banners.length !== 0 ? (
          banners.map((banner: any) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Banner Image"
                className="w-full h-40 object-cover"
                height={150}
                src={banner?.mobile_image}
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{banner?.title}</h3>
                <p className="text-gray-500">product attached: {banner?.id}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                          <FileEditIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Banner</DialogTitle>
                          <DialogDescription>
                            Edit the promotional banner details.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form action="">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Banner title"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="mobile_image"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Banner Image</FormLabel>
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
                                          form.setValue(
                                            "mobile_image",
                                            res.url
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product ID</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Product ID"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                        <DialogFooter>
                          <DialogClose>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose>
                            <Button>Save</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            {loading ? "Loading..." : "No banners found."}
          </div>
        )}
      </div>
    </div>
  );
}
