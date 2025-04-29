"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetOrderById, useVerifyPayment } from "@/hooks/order.hook";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/features/cartSlice/cartSlice";
import { useCurrentUser } from "@/hooks/auth.hook";

interface SuccessPageClientProps {
  orderId: string;
  paymentIntent?: string;
}

export default function SuccessPageClient({
  orderId,
  paymentIntent,
}: SuccessPageClientProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: userData } = useCurrentUser();

  // Safely access userId with optional chaining and fallback
  const userId = userData?.userID || null;

  // Fetch order data
  const {
    data: orderData,
    isLoading: orderLoading,
    refetch,
  } = useGetOrderById(orderId);

  // Payment verification mutation
  const {
    mutate: verifyPayment,
    isPending: verificationLoading,
    isError: verificationError,
  } = useVerifyPayment();

  useEffect(() => {
    // Check if we have the necessary data
    if (!orderId || !paymentIntent) {
      router.push("/404");
      return;
    }

    // Add logging to debug cart clearing issues

    // Verify payment status via our API endpoint
    verifyPayment(
      { orderId, paymentIntentId: paymentIntent },
      {
        onSuccess: () => {
          refetch();
          dispatch(resetCart(userId));
        },
        onError: (error) => {
          console.error("Payment verification failed:", error);
          // Payment verification failed, redirect after a short delay
          setTimeout(() => {
            router.push(`/order/${orderId}`);
          }, 3000);
        },
      }
    );
  }, [
    orderId,
    paymentIntent,
    router,
    refetch,
    verifyPayment,
    dispatch,
    userId,
  ]);

  // Show loading state
  if (verificationLoading || orderLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Verifying your payment...</h1>
        <p className="text-gray-600 mb-8">
          Please wait while we confirm your transaction.
        </p>
      </div>
    );
  }

  // Show error state
  if (verificationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment verification failed
        </h1>
        <p className="text-gray-600 mb-8">
          Redirecting to your order details...
        </p>
      </div>
    );
  }

  // Show success state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thanks for your purchase!
      </h1>
      <p className="text-gray-600 mb-8">
        We are processing your order. A confirmation email will be sent shortly.
      </p>
      {orderData?.data?.total && (
        <p className="text-xl font-semibold mb-8">
          Total: ${orderData.data.total.toFixed(2)}
        </p>
      )}
      <Button asChild>
        <Link href={`/order/${orderId}`}>View Order Details</Link>
      </Button>
    </div>
  );
}
