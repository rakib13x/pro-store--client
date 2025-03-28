/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import config from "@/config";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";

const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};

export const getAllProduct = async (
    searchTerm: string,
    page: number
) => {
    try {
        const res = await axiosInstance.get(`/product/allproducts`, {
            params: {
                searchTerm,
                page,
            },
        });

        return res?.data;
    } catch (error: any) {
        handleError(error);
    }
};


export const createProduct = async (productData: any) => {
    try {
        const { data } = await axiosInstance.post(
            `${config.backendApi}/product/create-product`,
            productData
        );
        return data;
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
