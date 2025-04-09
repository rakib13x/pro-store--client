import { Metadata } from "next";
import ShippingClient from "./shippingClient";

export const metadata: Metadata = {
  title: "Shipping Address",
};

export default function ShippingAddressPage() {
  // No Redux or useQuery here — just render the client component
  return <ShippingClient />;
}
