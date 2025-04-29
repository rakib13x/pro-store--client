/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { notFound, useParams } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { useCreatePaymentIntent, useGetOrderById } from "@/hooks/order.hook";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

interface OrderClientProps {
  // The slug prop is optional since we'll also check URL params
  slug?: string;
}

const OrderClient = ({ slug: propSlug }: OrderClientProps) => {
  // Get the orderId from URL params as a fallback
  const params = useParams();
  const urlOrderId =
    typeof params?.id === "string"
      ? params.id
      : typeof params?.slug === "string"
      ? params.slug
      : "";

  // Use propSlug if available, otherwise use URL param
  const [orderId, setOrderId] = useState("");

  // Set orderId once on mount
  useEffect(() => {
    const idToUse = propSlug || urlOrderId || "";
  
    setOrderId(idToUse);
  }, [propSlug, urlOrderId]);


  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data: orderData, isLoading: orderLoading } = useGetOrderById(orderId);

  // if (orderData?.data) {
  //   console.log("Order items array:", orderData.data.orderItems);
  //   console.log("First order item:", orderData.data.orderItems?.[0]);
  // }

  const {
    mutate: createIntent,
    data: paymentIntentData,
    isPending: isCreatingIntent,
  } = useCreatePaymentIntent();

  // Create payment intent when order data is available
  useEffect(() => {
    if (
      orderData?.data?.paymentMethod === "Stripe" &&
      orderData?.data?.paymentStatus === "PENDING" &&
      !paymentIntentData &&
      orderId !== ""
    ) {
      createIntent(orderId);
    }
  }, [orderData, orderId, createIntent, paymentIntentData]);

  // Show loader if conditions aren't met for rendering
  if (orderId === "") {
   
    return (
      <div className="text-center py-10 grid place-items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (orderLoading) {
    return (
      <div className="text-center py-10 grid place-items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (userLoading) {
    return <Loader />;
  }

  // Return 404 if order data not found
  if (!orderData || !orderData.data) {
    return notFound();
  }

  // Check if necessary data structures exist before trying to use them
  if (!orderData.data.orderItems || !Array.isArray(orderData.data.orderItems)) {
    return <div>Error: Order details are incomplete or malformed</div>;
  }

  // Use the client secret from the mutation data
  const clientSecret = paymentIntentData?.data?.clientSecret || null;

  return (
    <>
      {isCreatingIntent && <div>Setting up payment... Please wait.</div>}

      <OrderDetailsTable
        order={{
          id: orderData.data.orderId,
          userId: orderData.data.userId,
          createdAt: orderData.data.createdAt,
          user: {
            id: orderData.data.userId,
            name: orderData.data.user?.name || "Unknown User",
            email: orderData.data.user?.email || "Unknown Email",
          },
          shippingAddress: orderData.data.shippingAddress || {},
          orderItems: orderData.data.orderItems.map((item: any) => ({
            slug: item.productId,
            name: item.product?.name || "Unknown Product",
            image: item.product?.productPhoto || "",
            qty: item.quantity || 1,
            price: item.price || 0,
          })),
          itemsPrice: orderData.data.subTotal || 0,
          shippingPrice: String(
            (orderData.data.total || 0) -
              (orderData.data.subTotal || 0) -
              (orderData.data.tax || 0)
          ),
          taxPrice: orderData.data.tax || 0,
          totalPrice: orderData.data.total || 0,
          paymentMethod: orderData.data.paymentMethod || "Unknown",
          isDelivered: orderData.data.orderStatus === "DELIVERED",
          isPaid: orderData.data.paymentStatus === "COMPLETED",
          paidAt:
            orderData.data.paymentStatus === "PAID"
              ? orderData.data.updatedAt
              : null,
          deliveredAt:
            orderData.data.orderStatus === "DELIVERED"
              ? orderData.data.updatedAt
              : null,
        }}
        stripeClientSecret={clientSecret}
        paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}
        isAdmin={userData?.role === "admin" || false}
      />
    </>
  );
};

export default OrderClient;
