// types/review.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
}

export interface IReview {
  reviewId: string;
  content: string;
  rating: number;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IReviewVotes {
  likeCount: number;
  dislikeCount: number;
}

export interface IReviewFormData {
  title: string;
  content: string;
  rating: string | number;
}

export interface IAddReviewData {
  productId: string;
  userId: string;
  content: string;
  title?: string;
  rating: number;
}
export type ReviewType = {
  user: {
    name: string;
    profilePhoto: string;
  };
  createdAt: string;
  rating: number;
  content: string;
};
