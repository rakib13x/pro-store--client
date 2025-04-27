/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IApiResponse } from "@/interface/apiResponse.interface";
import { queryClient } from "@/providers/Provider";
import {
  addReview,
  deleteReview,
  getProductReviews,
  getReviewVotes,
  updateReview,
  voteReview
} from "@/services/review";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Define interfaces
export interface IReview {
  reviewId: string;
  content: string;
  rating: number;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
  };
}

export interface IReviewVotes {
  likeCount: number;
  dislikeCount: number;
}

// Helper function to invalidate reviews for a specific product
const invalidateProductReviews = (productId: string) =>
  queryClient.invalidateQueries({ queryKey: ["product-reviews", productId] });

// Add a review
export const useAddReview = (productId: string) => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: addReview,
    onSuccess: () => invalidateProductReviews(productId)
  });
};

// Update a review
export const useUpdateReview = (productId: string) => {
  return useMutation<any, Error, { id: string; data: FieldValues }>({
    mutationFn: updateReview,
    onSuccess: () => invalidateProductReviews(productId)
  });
};

// Delete a review
export const useDeleteReview = (productId: string) => {
  return useMutation<any, Error, string>({
    mutationFn: deleteReview,
    onSuccess: () => invalidateProductReviews(productId)
  });
};

// Vote on a review
export const useVoteReview = (reviewId: string) => {
  return useMutation<
    any,
    Error,
    { reviewId: string; userId: string; vote: 'LIKE' | 'DISLIKE' }
  >({
    mutationFn: voteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-votes", reviewId] });
    }
  });
};

// Get reviews for a product
export const useProductReviews = (productId: string) => {
  return useQuery<IApiResponse<IReview[]>>({
    enabled: !!productId,
    queryKey: ["product-reviews", productId],
    queryFn: () => getProductReviews(productId),
  });
};

// Get votes for a review
export const useReviewVotes = (reviewId: string) => {
  return useQuery<IApiResponse<IReviewVotes>>({
    enabled: !!reviewId,
    queryKey: ["review-votes", reviewId],
    queryFn: () => getReviewVotes(reviewId),
  });
};