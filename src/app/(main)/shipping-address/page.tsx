import { Metadata } from "next";
import ShippingClient from "./shippingClient";

export const metadata: Metadata = {
  title: "Shipping Address",
};

export default function ShippingAddressPage() {
  return (
    <main className="flex-1 wrapper">
      <ShippingClient />
    </main>
  );
}
