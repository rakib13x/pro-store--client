"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetOrderById, useVerifyPayment } from "@/hooks/order.hook";

const SuccessPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { payment_intent: string };
}) => {
  const router = useRouter();
  const { id } = params;
  const { payment_intent: paymentIntentId } = searchParams;

  // Use the ID directly from params
  const {
    data: orderData,
    isLoading: orderLoading,
    refetch,
  } = useGetOrderById(id);

  const {
    mutate: verifyPayment,
    isPending: verificationLoading,
    isError: verificationError,
  } = useVerifyPayment();

  useEffect(() => {
    // Check if we have the necessary data
    if (!id || !paymentIntentId) {
      router.push("/404");
      return;
    }

    // Verify payment status via our API endpoint
    verifyPayment(
      { orderId: id, paymentIntentId },
      {
        onSuccess: () => {
          // Refetch order data to get updated payment status
          refetch();
        },
        onError: () => {
          // Payment verification failed, redirect after a short delay
          setTimeout(() => {
            router.push(`/order/${id}`);
          }, 3000);
        },
      }
    );
  }, [id, paymentIntentId, router, refetch, verifyPayment]);

  if (verificationLoading || orderLoading) {
    return (
      <div>
        <h3>Verifying your payment...</h3>
      </div>
    );
  }

  if (verificationError) {
    return (
      <div>
        <h3>Payment verification failed</h3>
        <p>Redirecting to your order details...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Thanks for your purchase!</h1>
      <p>
        We are processing your order. A confirmation email will be sent shortly.
      </p>
      {orderData?.data?.total && (
        <p>Total: ${orderData.data.total.toFixed(2)}</p>
      )}
      <Button asChild>
        <Link href={`/order/${id}`}>View Order Details</Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
