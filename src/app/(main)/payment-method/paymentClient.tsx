"use client";
import React from "react";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/checkout-steps";
import { useCurrentUser } from "@/hooks/auth.hook";
const PaymentClient = () => {
  const { data: userData, isLoading } = useCurrentUser();
  console.log("userData", userData);

  if (isLoading) return <p>Loading...</p>;
  if (!userData) return <p>No user found</p>;

  return (
    <div>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={userData.paymentMethod} />
    </div>
  );
};

export default PaymentClient;
