import React from "react";
import { cn } from "@heroui/react";

import Review from "./review";
import { ReviewType } from "./review-type";
import ReviewList from "./reviewList";

export type CardReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const CardReview = React.forwardRef<HTMLDivElement, CardReviewProps>(
  ({ className, ...review }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-medium bg-content1 p-5 shadow-small mt-5",
        className
      )}
    >
      <ReviewList {...review} />
    </div>
  )
);

CardReview.displayName = "CardReview";

export default CardReview;
