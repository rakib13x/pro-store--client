"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IUser } from "@/interface/user.interface";
import { queryClient } from "@/providers/Provider";
import { createProduct, getAllProduct } from "@/services/product";
import { deleteUser, updatePass } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Fetch all users with optional filters
export const useGetAllProducts = (search: string, page: number) =>
    useQuery<IApiResponse<IUser[]>>({
        queryKey: ["get-all-productdata", search, page],
        queryFn: () => getAllProduct(search, page),
    });

// Helper function to invalidate "get-all-userdata" query
const invalidateAllUserData = () =>
    queryClient.invalidateQueries({ queryKey: ["get-all-productdata"] });

// create a Product
export const useCreateProduct = () => {
    return useMutation<any, Error, FieldValues, unknown>({
        mutationFn: (data: any) => createProduct(data),
    });
};

// Delete a user mutation
export const useDeleteUser = () =>
    useMutation<any, Error, string>({
        mutationFn: deleteUser,
        onSuccess: invalidateAllUserData,
    });

// Update password mutation
export const useUpdatePass = () =>
    useMutation<any, Error, { password: string }>({
        mutationFn: updatePass,
    });