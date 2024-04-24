"use client";

import { Button } from "@/components/ui/button";
import { Loader2, PackageIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "./product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CSVReader from "react-csv-reader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { BulkOptionBar } from "./bulk-options";
import { toast } from "sonner";

export function ProductCatalogue() {
  const [products, setProducts] = useState([]) as any;
  const [search, setSearch] = useState("") as any;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const searchq = searchParams.get("search");
  const brand = searchParams.get("brand");
  const published = searchParams.get("published");
  const [importedData, setImportedData] = useState([]) as any;

  const fetchProducts = async (page: any) => {
    setLoading(true);
    const response = await fetch(`/api/product/?page=${page}`);
    const data = await response.json();
    setProducts(data["data"]);
    setTotal(data["count"]);
    setLoading(false);
  };

  const fetchbrandProducts = async (brand: any) => {
    setLoading(true);
    const response = await fetch(`/api/product/?brand=${brand}`);
    const data = await response.json();
    setProducts(data["data"]);
    setTotal(data["count"]);
    setLoading(false);
  };

  useEffect(() => {
    if (brand) {
      fetchbrandProducts(brand);
    } else if (searchq == null) {
      fetchProducts(page);
    } else {
      if (searchq !== "") {
        fetchSearchProducts(searchq);
      }
    }
  }, [page, searchq, brand]);

  const fetchSearchProducts = async (searchq: string) => {
    setLoading(true);
    console.log(searchq);
    const response = await fetch(`/api/productsearch/?search=${searchq}`);
    const data = await response.json();
    setProducts(data["data"]);
    setTotal(data["count"]);
    setLoading(false);
  };

  const getAllProductsCSV = async () => {
    setExporting(true);

    const res = await fetch(`/api/product/export/all`);
    const data = await res.json();
    // download the file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    setExporting(false);
  };

  const transformData = (data: any) => {
    const transformedData = data.slice(1).map((item: any) => {
      return {
        name: item[0],
        sku: item[1],
        barcode: item[1],
        price: {
          minimalPrice: item[2],
          maximalPrice: item[2],
          regularPrice: item[2],
        },
        manufacturer: item[3],
        max_sale_qty: item[4],
        thumbnail_url: item[5],
        short_description: item[6],
        product_specs: {
          description: item[7],
          key_specifications: "",
          packaging: "",
          direction_to_use: "",
          features: "",
        },
        meta_title: item[0],
        meta_description: item[6] || "",
        media_gallery_entries: [
          {
            file: item[5],
          },
        ],
        categories: [
          {
            name: item[3],
          },
        ],
        published: false,
      };
    });
    return transformedData;
  };

  const handleCSVImport = async (data: any) => {
    console.log(data);
    try {
      setImporting(true);
      console.log(data);

      const res = await fetch(`/api/product`, {
        method: "PUT",
        body: JSON.stringify({
          operation: "import",
          data: data,
        }),
      });
      const response = await res.json();
      console.log(response);
      setImporting(false);
    } catch (error) {
      console.error("Error:", JSON.stringify(error));
      toast("Error", {
        description: "An error occurred while importing the data.",
        closeButton: true,
      });
      setImporting(false);
    }
  };

  const router = useRouter();
  return (
    <div className="flex flex-col ">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Product Catalog</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input
              className="min-w-3xl"
              placeholder="Search..."
              type="search"
              onChange={async (e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={async (e) => {
                if (e.key === "Enter" && search === "") {
                  router.push(`/dashboard/products`);
                  fetchProducts(page);
                }
                if (e.key === "Enter" && search !== "") {
                  router.push(`/dashboard/products?search=${search}`);
                  fetchSearchProducts(search);
                }
              }}
            />

            <Search
              className="h-16 cursor-pointer w-16 text-black"
              onClick={async () => {
                if (search === "") {
                  router.push(`/dashboard/products`);
                  fetchProducts(page);
                }
                if (search !== "") {
                  router.push(`/dashboard/products?search=${search}`);
                  fetchSearchProducts(search);
                }
              }}
            />

            <Button
              onClick={() => router.replace("/dashboard/products/addProduct")}
              size="sm"
            >
              Add Product
            </Button>

            <Button variant={"outline"} size="sm" onClick={getAllProductsCSV}>
              Export CSV
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Import CSV
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] mx-auto">
                <DialogHeader>
                  <DialogTitle>Import Product (CSV)</DialogTitle>
                  <DialogDescription>
                    Select a CSV file to import into the database.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                  <div className="items-center ">
                    <Label className="text-right" htmlFor="file">
                      CSV File
                    </Label>
                    <CSVReader
                      onFileLoaded={(data: any) => {
                        console.log(data);
                        setImportedData(data);
                      }}
                      onError={(err: any) => {
                        console.log(err);
                      }}
                      parserOptions={{
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        transformHeader: (header: any) =>
                          header.toLowerCase().replace(/\W/g, "_"),
                      }}
                    />

                    {importedData.length > 0 && (
                      <div className="flex flex-col">
                        <p className="col-span-3 text-sm text-gray-500">
                          {importedData.length} rows loaded
                        </p>
                        <div className="max-h-96 mb-10 overflow-scroll">
                          <table className="table-auto w-full ">
                            <thead>
                              <tr
                                className="
                                text-left
                                text-sm
                                text-gray-900
                                border-b
                                border-gray-200
                                "
                              >
                                {importedData[0].map((item: any) => (
                                  <th
                                    className="border-r border-gray-200
                                    px-4 py-2
                                    "
                                    key={item}
                                  >
                                    {item}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="text-sm text-gray-500">
                              {importedData
                                .slice(1, 100)
                                .map((row: any, index: any) => (
                                  <tr
                                    className="border-b border-gray-200"
                                    key={index}
                                  >
                                    {row.map((item: any, index: any) => (
                                      <td
                                        className="border-r border-gray-200
                                                                             "
                                        key={index}
                                      >
                                        {item}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    className="ml-auto"
                    type="button"
                    disabled={importing}
                    onClick={() => handleCSVImport(transformData(importedData))}
                  >
                    {importing ? "Importing..." : "Import"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <main className="flex-1 m-8">
        {selectedProduct && selectedProduct.length > 0 && (
          <div className="mb-4">
            <BulkOptionBar
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              products={products}
            />
          </div>
        )}
        {exporting && (
          <div className="flex items-center justify-center h-64">
            <Loader2
              className="w-8 h-8 
            animate-spin
           "
            />
            <p className="text-lg text-gray-500">
              Exporting products... Please wait. Do not close the window. You
              can do other things while the export is in progress. file will be
              downloaded automatically.
            </p>
          </div>
        )}
        {products.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">
              No products found. Try adding a new product.
            </p>
          </div>
        ) : null}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            {searchq ||
              (brand && (
                <p className="text-md mb-4 font-semibold">
                  {searchq
                    ? `Search results for "${searchq}" found (${products.length}) products`
                    : `Showing products for ${brand} found (${products.length}) products`}
                </p>
              ))}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              {products.map((product: any) => (
                <ProductCard
                  id={product._id}
                  key={product.sku}
                  title={product.name}
                  description={product.short_description}
                  image={
                    product.thumbnail_url.startsWith("http")
                      ? product.thumbnail_url
                      : "https://images1.dentalkart.com/media/catalog/product" +
                        product.thumbnail_url
                  }
                  price={product.price?.minimalPrice}
                  slug={product.sku}
                  media_gallery={product.media_gallery_entries.map(
                    (file: any) => file.file
                  )}
                  product={product}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>
            {
              <div>
                current page: {page} of {Math.ceil(total / 10)}
              </div>
            }
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => {
                  if (page < Math.ceil(total / 10)) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
