/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { queryClient } from "@/providers/Provider";
import { createPaymentIntent, getOrderById, createOrder as serverCreateOrder, verifyPayment } from "@/services/order";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IApiResponse } from "@/interface/apiResponse.interface";
// import { IOrder } from "@/interface/order.interface";

const invalidateAllOrderData = () =>
    queryClient.invalidateQueries({ queryKey: ["all-orders"] });

export const useCreateOrder = () => {
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartItems);

    return useMutation({
        mutationFn: async () => serverCreateOrder(cartItems),
        onSuccess: invalidateAllOrderData
    });
};


export const useGetOrderById = (orderId: string) => {
    return useQuery<IApiResponse<any>>({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
        enabled: orderId !== "",
    });
};


export const useCreatePaymentIntent = (): UseMutationResult<
    IApiResponse<any>,
    Error,
    string,
    unknown
> => {
    return useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: invalidateAllOrderData,
    });
};


export const useVerifyPayment = (): UseMutationResult<
    IApiResponse<any>,
    Error,
    { orderId: string; paymentIntentId: string },
    unknown
> => {
    return useMutation({
        mutationFn: verifyPayment,
        onSuccess: invalidateAllOrderData,
    });
};