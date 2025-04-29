"use client";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetUserById } from "@/hooks/user.hook";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

const PlaceOrderClient = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const userId = userData?.userID;

  const { data: userLatestData, isLoading: userDataLoading } =
    useGetUserById(userId);

  if (userLoading || userDataLoading)
    return (
      <p className="flex justify-center items-center h-screen">
        <Loader />
      </p>
    );
  if (!userId) return <p>No user found</p>;

  const user = userLatestData?.data;

  if (!user) return <p>User data not found</p>;

  const userAddress = user.address;

  if (cartItems.length === 0) redirect("/cart");
  if (!userAddress) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <>
      {/* ... */}
      <h1 className="py-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-2xl pb-4">Shipping Address</h2>
              <p className="text-xl">{userAddress.fullName}</p>
              <p className="text-xl">
                {userAddress.streetAddress}, {userAddress.city}{" "}
                {userAddress.postalCode}, {userAddress.country}{" "}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline" className="text-lg font-normal">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-2xl pb-4">Payment Method</h2>
              <p className="text-xl">{user.paymentMethod}</p>
              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline" className="text-lg font-normal">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-2xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Link
                          href={`/product/{item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.productPhoto}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.quantity}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* ... */}
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between ">
                <div className="text-lg font-semibold">Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderClient;
