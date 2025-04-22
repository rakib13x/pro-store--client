"use client";
import { useGetMyOrders } from "@/hooks/order.hook";
import React from "react";

const MyOrders = () => {
  const { data: myOrdersData, isLoading, error } = useGetMyOrders();

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {(error as Error).message}</div>;

  console.log("My Orders Data:", myOrdersData);
  return <div>MyOrders</div>;
};

export default MyOrders;
