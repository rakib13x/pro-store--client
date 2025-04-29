/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Modal, useDisclosure } from "@heroui/react";
import ModalReview from "./modal-review";

export default function ReviewSection({ productId }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Handle case when user is not logged in
  const handleReviewClick = () => {
    onOpen();
  };

  return (
    <>
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <button className=" btn-pink-solid" onClick={handleReviewClick}>
            write a Review
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          shouldBlockScroll={false}
          onOpenChange={onOpenChange}
        >
          <ModalReview
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            productId={productId}
          />
        </Modal>
      </section>
    </>
  );
}
