/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Metadata } from "next";
import OrderClient from "./OrderClient";
import { use } from "react";

export const metadata: Metadata = {
  title: "Order Details",
};

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className=" ">
      <main className="flex-1 wrapper pt-12">
        <OrderClient params={Promise.resolve({ id })} />
      </main>
    </div>
  );
}
