/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import RatingRadioGroup from "./rating-radio-group";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useAddReview } from "@/hooks/review.hook";
import { toast } from "sonner";

interface ModalReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  productId: string;
}

const ModalReview: React.FC<ModalReviewProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  productId,
}) => {
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.userID;
  const addReviewMutation = useAddReview(productId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: "",
      rating: 5,
    },
  });

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((field) => {
        const errorMessage =
          errors[field as keyof typeof errors]?.message?.toString() ||
          "This field is required";
        toast.error(errorMessage);
      });
      return;
    }

    try {
      const reviewData = {
        ...data,
        productId: productId,
        userId: userId || currentUser?.id,
      };

      addReviewMutation.mutate(reviewData, {
        onSuccess: () => {
          toast.success("Review added successfully!");
          reset();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to submit review");
          console.error("Failed to submit review:", error);
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred");
      console.error("Failed to submit review:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            Write a Review
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <p className="text-medium mb-2">Your Rating</p>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating is required" }}
                  render={({ field }) => (
                    <RatingRadioGroup
                      {...field}
                      value={field.value.toString()}
                      hideStarsText
                    />
                  )}
                />
                {errors.rating && (
                  <p className="text-danger text-sm mt-1">
                    {errors.rating.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <p className="text-medium mb-2">Review Content</p>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Review content is required" }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="What did you like or dislike about this product?"
                      className="w-full min-h-32"
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-danger text-sm mt-1">
                    {errors.content.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit Review
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalReview;
