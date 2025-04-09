/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { cookies } from "next/headers";
import { getServerSideUserData } from "../authService";
import { ICartItem } from "@/redux/features/cartSlice/cartSlice";


const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};

export const createOrder = async (cartItems: ICartItem[]) => {
    try {
        // Calculate prices
        const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
        const shippingPrice = itemsPrice > 200 ? 0 : 15;
        const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        // Transform cart items to order items format
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        // Get user data from token
        const userData = await getServerSideUserData();

        // Prepare order data
        const orderData = {
            userId: userData.id,
            total: totalPrice,
            subTotal: itemsPrice,
            shippingAddress: userData.address,
            paymentMethod: userData.paymentMethod,
            orderItems: orderItems
        };

        // Get the token for authentication
        const token = (await cookies()).get("accessToken")?.value;

        const res = await axiosInstance.post(
            `/order/create-order`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.data;
    } catch (error) {
        return handleError(error);
    }
};