import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function OrderDetails({ order }: any) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
          <CardDescription>
            Order #{order._id} placed by
            <Link className="text-blue-600 underline ml-2" href="#">
              {order.orderby?.firstname} {order.orderby?.lastname}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="font-medium">Order number</div>
            <div>#{order._id}</div>
            <div className="font-medium">Date</div>
            <div>
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="font-medium">Status</div>
            <div>{order.orderStatus}</div>
            <div className="font-medium">Total</div>
            <div>₹ {order.paymentIntent.amount}</div>
          </div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="font-medium">Customer</div>
            <div>
              {order.orderby?.firstname} {order.orderby?.lastname}
            </div>
            <div className="font-medium">Email</div>
            <div>{order.orderby?.email}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products.map((product: any) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.product.name}
                    </TableCell>
                    <TableCell>{product.count}</TableCell>
                    <TableCell>₹ {product?.price}</TableCell>
                    <TableCell>₹ {product?.price * product.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shipping information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="font-medium">Method</div>
            <div>Standard shipping</div>
            <div className="font-medium">Tracking number</div>
            <div>1Z9999999999999999</div>
            <div className="font-medium">Expected delivery</div>
            <div>
              {new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 7
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1 text-sm">
            <Link className="text-blue-600 underline" href="#">
              {order.orderby?.firstname} {order.orderby?.lastname}
            </Link>
            <div>{order.orderby?.email}</div>
            <div>{order.shippingAddress?.mobile}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shipping address</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {order.shippingAddress?.name}
            <br />
            {order.shippingAddress?.address}
            <br />
            {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
            {order.shippingAddress?.pincode}
            <br />
            {order.shippingAddress?.country}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">
          <Button>Mark as shipped</Button>
          <Button variant="outline">Cancel order</Button>
        </CardContent>
      </Card>
    </>
  );
}
