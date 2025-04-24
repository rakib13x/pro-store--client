import { Metadata } from "next";
import PaymentClient from "./paymentClient";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  return (
    <>
      <main className="flex-1 wrapper">
        <PaymentClient />
      </main>
    </>
  );
};

export default PaymentMethodPage;
