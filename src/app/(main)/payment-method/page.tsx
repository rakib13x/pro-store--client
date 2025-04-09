import { Metadata } from "next";
import PaymentClient from "./paymentClient";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  return (
    <>
      <PaymentClient />
    </>
  );
};

export default PaymentMethodPage;
