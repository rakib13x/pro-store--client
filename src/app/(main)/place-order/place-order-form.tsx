"use client";

import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

const PlaceOrderForm = () => {
  const router = useRouter();
  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    try {
      const result = await createOrder(cartItems);

      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button disabled={isPending} className="w-full">
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    </form>
  );
};

export default PlaceOrderForm;
