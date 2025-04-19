"use client";

import { useSelector } from "react-redux";
import { useCurrentUser } from "@/hooks/auth.hook";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/checkout-steps";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/redux/store";

const ShippingClient = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const { data: userData, isLoading } = useCurrentUser();
  const userId = userData?.userID;
  console.log("userData", userData);

  useEffect(() => {
    if (cartItems.length === 0) {
      redirect("/cart");
    }
  }, [cartItems]);

  if (isLoading) return <p>Loading...</p>;
  if (!userId) return <p>No user found</p>;

  const address = userData?.address;
  console.log("user address is:", address);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={address} userID={userId} />
    </>
  );
};

export default ShippingClient;
