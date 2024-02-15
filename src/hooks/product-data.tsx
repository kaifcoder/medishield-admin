import create from "zustand";

interface ChildProduct {
  id: number;
  image_url: string;
  name: string;
  sku: string;
  special_price: number;
  short_description?: string;
  average_rating?: string;
  rating_count?: string;
  is_in_stock: true;
  pd_expiry_date?: string;
  meta_title: string;
  price: {
    minimalPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
    maximalPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
    regularPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
  };
  tier_prices: {
    qty: number;
    value: number;
  }[];
  media_gallery_entries: {
    media_type: string;
    label: string | null;
    file: string;
  }[];
  categories: string[]; // Assuming categories are just strings for child products
}

interface Product {
  _id: string;
  id: number;
  name: string;
  sku: string;
  special_price: number;
  thumbnail_url: string;
  short_description: string;
  manufacturer: string;
  average_rating: string;
  rating_count: string;
  is_in_stock: boolean;
  is_cod: string;
  weight: number | null;
  max_sale_qty: number;
  pd_expiry_date: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  price: {
    minimalPrice: number;
    maximalPrice: number;
    regularPrice: number;
  };
  tier_prices: {
    qty: number;
    value: number;
  }[];
  media_gallery_entries: {
    id: number;
    media_type: string;
    label: string | null;
    file: string;
  }[];
  categories: {
    name: string;
  }[];
  qa_data: any[];
  product_specs: {
    description: string;
    key_specifications: string;
    packaging: string;
    direction_to_use: string;
    features: string;
  };
  childProducts: ChildProduct[] | undefined;
}

type ProductDataStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
};

export const useProductData = create<ProductDataStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p._id === product._id ? product : p
      ),
    })),
}));
