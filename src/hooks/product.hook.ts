"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IProduct } from "@/interface/product.interface";
import { queryClient } from "@/providers/Provider";
import { addProduct, deleteProduct, getAllProduct, singleProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Helper function to invalidate "get-all-userdata" query
const invalidateAllProductData = () =>
    queryClient.invalidateQueries({ queryKey: ["get-all-productdata"] });

export const useCreateProduct = () => {
    return useMutation<any, Error, FieldValues>({
        mutationFn: addProduct,
        onSuccess: invalidateAllProductData
    });
};

export const useGetAllProducts = (search: string, page: number, categoryId: string | null) => {
    return useQuery({
        queryKey: ["get-all-productdata", search, page, categoryId],
        queryFn: () => getAllProduct(search, page, categoryId),
    });
};


export const useSingleProduct = (id: string) => {
    return useQuery<IApiResponse<IProduct>>({
        enabled: !!id, // Ensure query runs only if id is provided
        queryKey: ["single-product", id],
        queryFn: () => singleProduct(id),
    });
};


export const useDeleteProduct = () =>
    useMutation<any, Error, string>({
        mutationFn: deleteProduct,
        onSuccess: invalidateAllProductData,
    });

