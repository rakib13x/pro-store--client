"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetOrderById, useVerifyPayment } from "@/hooks/order.hook";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/features/cartSlice/cartSlice";
import { useCurrentUser } from "@/hooks/auth.hook";

const SuccessPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { payment_intent: string };
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: userData } = useCurrentUser();

  // Get the order ID and payment intent ID
  const id = params.id;
  const paymentIntentId = searchParams.payment_intent;

  // Safely access userId with optional chaining and fallback
  const userId = userData?.userID || null;

  // Fetch order data
  const {
    data: orderData,
    isLoading: orderLoading,
    refetch,
  } = useGetOrderById(id);

  // Payment verification mutation
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

    // Add logging to debug cart clearing issues
    console.log("Starting payment verification for order:", id);
    console.log("Current user ID:", userId);

    // Verify payment status via our API endpoint
    verifyPayment(
      { orderId: id, paymentIntentId },
      {
        onSuccess: () => {
          console.log("Payment verification successful");
          refetch();

          // Clear the cart with the user ID
          console.log("Clearing cart for user:", userId);
          dispatch(resetCart(userId));
        },
        onError: (error) => {
          console.error("Payment verification failed:", error);
          // Payment verification failed, redirect after a short delay
          setTimeout(() => {
            router.push(`/order/${id}`);
          }, 3000);
        },
      }
    );
  }, [id, paymentIntentId, router, refetch, verifyPayment, dispatch, userId]); // Include userId in dependencies

  // Show loading state
  if (verificationLoading || orderLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <h3 className="text-xl font-semibold mb-2">
          Verifying your payment...
        </h3>
        <p>Please wait while we confirm your transaction.</p>
      </div>
    );
  }

  // Show error state
  if (verificationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-red-600">
        <h3 className="text-xl font-semibold mb-2">
          Payment verification failed
        </h3>
        <p>Redirecting to your order details...</p>
      </div>
    );
  }

  // Show success state
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Thanks for your purchase!
      </h1>
      <p className="mb-4 text-center">
        We are processing your order. A confirmation email will be sent shortly.
      </p>
      {orderData?.data?.total && (
        <p className="text-lg font-semibold mb-6">
          Total: ${orderData.data.total.toFixed(2)}
        </p>
      )}
      <Button asChild className="px-6">
        <Link href={`/order/${id}`}>View Order Details</Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
