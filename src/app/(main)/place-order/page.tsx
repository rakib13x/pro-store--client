import { Metadata } from "next";
import CheckoutSteps from "@/components/checkout-steps";

import PlaceOrderClient from "./PlaceOrderClient";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  return (
    <>
      <CheckoutSteps current={3} />
      <PlaceOrderClient />
    </>
  );
};

export default PlaceOrderPage;
