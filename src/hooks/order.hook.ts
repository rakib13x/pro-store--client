"use client";

import { queryClient } from "@/providers/Provider";
import { createOrder as serverCreateOrder } from "@/services/order";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const invalidateAllOrderData = () =>
    queryClient.invalidateQueries({ queryKey: ["all-orders"] });

export const useCreateOrder = () => {
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartItems);

    return useMutation({
        mutationFn: async () => serverCreateOrder(cartItems),
        onSuccess: invalidateAllOrderData
    });
};