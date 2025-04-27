/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import config from "@/config";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

const handleError = (error: any) => {
    throw new Error(error?.response?.data?.message || error?.message || error);
};

export const addReview = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/review/add-review", data);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateReview = async ({ id, data }: { id: string; data: FieldValues }) => {
    try {
        const res = await axiosInstance.patch(`${config.backendApi}/review/${id}`, data);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteReview = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`${config.backendApi}/review/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const voteReview = async (data: { reviewId: string; userId: string; vote: 'LIKE' | 'DISLIKE' }) => {
    try {
        const res = await axiosInstance.post(`${config.backendApi}/review/vote`, data);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const getReviewVotes = async (reviewId: string) => {
    try {
        const res = await axiosInstance.get(`${config.backendApi}/review/votes/${reviewId}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductReviews = async (productId: string) => {
    try {
        const res = await axiosInstance.get(`${config.backendApi}/review/${productId}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};