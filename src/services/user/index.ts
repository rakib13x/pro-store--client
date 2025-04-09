/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance/axiosInstance";

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};

export const getAllUser = async (
  searchTerm: string,
  isBlocked: string,
  page: number
) => {
  try {
    const res = await axiosInstance.get(`/user/all-user`, {
      params: {
        searchTerm,
        isBlocked,
        page,
      },
    });

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const blockUser = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/user/block/${id}`);
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/user/delete/${id}`);
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const updatePass = async (data: { password: string }) => {
  try {
    const res = await axiosInstance.patch(`/user/update-pass`, data);
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};


export const updateShippingAddress = async (data: any) => {
  try {
    // Make sure userID is included in the request
    if (!data.userID) {
      throw new Error("User ID is required");
    }

    const res = await axiosInstance.patch(`/user/update-shipping-address`, data);
    return res?.data;
  } catch (error: any) {
    console.error("Error updating shipping address:", error);
    throw new Error(error?.response?.data?.message || "Failed to update shipping address");
  }
};

export const updatePaymentMethod = async (data: any) => {
  try {
    if (!data.userID) {
      throw new Error("User ID is required");
    }

    const res = await axiosInstance.patch(`/user/update-payment-method`, data);
    return res?.data;
  } catch (error: any) {
    console.error("Error updating payment method:", error);
    throw new Error(error?.response?.data?.message || "Failed to update shipping address");
  }
}