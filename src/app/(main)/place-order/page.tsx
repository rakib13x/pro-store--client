import { Metadata } from "next";
import CheckoutSteps from "@/components/checkout-steps";

import PlaceOrderClient from "./PlaceOrderClient";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  return (
    <>
      <main className="flex-1 wrapper">
        <CheckoutSteps current={3} />
        <PlaceOrderClient />
      </main>
    </>
  );
};

export default PlaceOrderPage;
