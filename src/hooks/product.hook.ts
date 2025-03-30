"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IUser } from "@/interface/user.interface";
import { queryClient } from "@/providers/Provider";
import { addProduct, deleteProduct, getAllProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";


export const useGetAllProducts = (search: string, page: number) =>
    useQuery<IApiResponse<IUser[]>>({
        queryKey: ["get-all-productdata", search, page],
        queryFn: () => getAllProduct(search, page),
    });

// Helper function to invalidate "get-all-userdata" query
const invalidateAllProductData = () =>
    queryClient.invalidateQueries({ queryKey: ["get-all-productdata"] });

export const useCreateProduct = () => {
    return useMutation<any, Error, FieldValues>({
        mutationFn: addProduct,
        onSuccess: invalidateAllProductData
    });
};


export const useDeleteProduct = () =>
    useMutation<any, Error, string>({
        mutationFn: deleteProduct,
        onSuccess: invalidateAllProductData,
    });

