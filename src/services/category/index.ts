/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import config from "@/config";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";


const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};


export const addCategory = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post(`${config.backendApi}/category/create-category`, data);
        return res.data;
    } catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async (
    searchTerm: string,
    page: number
) => {
    try {
        const res = await axiosInstance.get(`/category/all-categories`, {
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


export const deleteCategory = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/category/${id}`);
      return res?.data;
    } catch (error: any) {
      handleError(error);
    }
  };