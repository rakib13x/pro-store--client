/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";

// Error handling helper function
const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};


export const getAllBlogs = async () => {
    try {
        const res = await axiosInstance.get("/blog/all-blogs");
        return res?.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

export const getSingleBlog = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/blog/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};
