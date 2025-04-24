"use client";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { useCreatePaymentIntent, useGetOrderById } from "@/hooks/order.hook";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const OrderClient = ({ params }: { params: Promise<{ id: string }> }) => {
  const [orderId, setOrderId] = useState<string>("");
  const [isResolvingId, setIsResolvingId] = useState(true);
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data: orderData, isLoading: orderLoading } = useGetOrderById(orderId);
  console.log("order data is:", orderData);
  const {
    mutate: createIntent,
    data: paymentIntentData,
    isPending: isCreatingIntent,
  } = useCreatePaymentIntent();

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setOrderId(resolvedParams.id);
        setIsResolvingId(false);
      } catch (error) {
        console.error("Error resolving params:", error);
        setIsResolvingId(false);
      }
    };

    resolveParams();
  }, [params]);

  // Second useEffect to create payment intent when order data is available
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

  if (isResolvingId || orderId === "" || orderLoading || userLoading) {
    return (
      <div>
        <p className="flex justify-center items-center h-screen">
          <Loader />
        </p>
      </div>
    );
  }

  // Now we can safely use the data
  if (!orderData) {
    return notFound();
  }

  // Use the client secret from the mutation data
  const clientSecret = paymentIntentData?.data?.clientSecret || null;

  return (
    <>
      {isCreatingIntent && (
        <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded">
          Setting up payment... Please wait.
        </div>
      )}
      <OrderDetailsTable
        order={{
          id: orderData.data.orderId,
          shippingAddress: orderData.data.shippingAddress.upsert
            .update as ShippingAddress,
          orderitems: orderData.data.orderItems.map((item) => ({
            slug: item.productId,
            name: item.product.name,
            image: item.product.productPhoto,
            qty: item.quantity,
            price: item.price,
          })),
          itemsPrice: orderData.data.subTotal,
          shippingPrice:
            orderData.data.total -
            orderData.data.subTotal -
            (orderData.data.tax || 0),
          taxPrice: orderData.data.tax || 0,
          totalPrice: orderData.data.total,
          paymentMethod: orderData.data.paymentMethod,
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
