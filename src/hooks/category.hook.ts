/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { ICategory } from "@/interface/category.interface";
import { queryClient } from "@/providers/Provider";
import { addCategory, deleteCategory, getAllCategories } from "@/services/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";


const invalidateAllCategoryData = () =>
    queryClient.invalidateQueries({ queryKey: ["get-all-categorydata"] });


export const useCreateCategory = () => {
    return useMutation<any, Error, FieldValues>({
        mutationFn: addCategory,
    });
};

export const useGetAllCategories = (search: string, page: number) =>
    useQuery<IApiResponse<ICategory[]>>({
        queryKey: ["get-all-categorydata", search, page],
        queryFn: () => getAllCategories(search, page),
    });


export const useDeleteCategory = () =>
    useMutation<any, Error, string>({
        mutationFn: deleteCategory,
        onSuccess: invalidateAllCategoryData,
    });