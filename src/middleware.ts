export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/orders/[slug]",
    "/dashboard/orders",
    "/dashboard/products/[slug]",
    "/dashboard/products",
    "/dashboard/products/addproduct",
    "/dashboard/products/addProduct/[slug]",
    "/dashboard/users",
    "/dashboard/products/addProduct",
  ],
};
