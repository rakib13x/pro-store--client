"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  type ModalProps,
  Button,
} from "@heroui/react";

import RatingRadioGroup from "./rating-radio-group";

const ModalReview = React.forwardRef<
  HTMLDivElement,
  Omit<ModalProps, "children">
>(({ isOpen, onClose, onOpenChange, ...props }, ref) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
    <ModalContent>
      <ModalHeader className="flex-col pt-8">
        <h1 className="text-large font-semibold">Write a review</h1>
        <p className="text-small font-normal text-default-400">
          Share your experience with this product
        </p>
      </ModalHeader>
      <ModalBody className="pb-8">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            console.log(data);

            onClose?.();
          }}
        >
          <RatingRadioGroup
            hideStarsText
            className="flex-col-reverse items-start"
            color="warning"
            label={<span className="text-small">Rating</span>}
          />
          <Textarea
            disableAutosize
            classNames={{
              input: "h-32 resize-y !transition-none",
            }}
            label="Comment"
            placeholder="Enter your comment"
          />
          <Button className="bg-primary-100" type="submit">
            Send review
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
));

ModalReview.displayName = "ModalReview";

export default ModalReview;
