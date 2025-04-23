/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import config from "@/config";
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IProduct } from "@/interface/product.interface";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};

export const getAllProduct = async (searchTerm: string, page: number, categoryId: string | null) => {
    try {
        const params: Record<string, any> = {
            searchTerm,
            page,
        };

        // Only include categoryId if it's not null
        if (categoryId) {
            params.categoryId = categoryId;
        }

        console.log("Fetching products with params:", params);

        const res = await axiosInstance.get("/product/allproducts", {
            params: params,
        });

        return res?.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchTopSellingProducts = async (): Promise<IApiResponse<IProduct[]>> => {
    const { data } = await axiosInstance.get("/product/top-selling-products");
    return data;
};



// export const createProduct = async (productData: any) => {
//     try {
//         const { data } = await axiosInstance.post(
//             `${config.backendApi}/product/create-product`,
//             productData
//         );
//         return data;
//     } catch (error: any) {
//         handleError(error);
//     }
// };



export const singleProduct = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/product/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};


export const addProduct = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post(
            `${config.backendApi}/product/create-product`,
            data
        );
        return res.data;
    } catch (error) {
        handleError(error);
    }
};


export const deleteProduct = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/product/${id}`);
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
