"use client";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { convertSlugToName } from "@/utils/helper";
import Breadcrumbs from "@/components/breadcrumbs";
import FoodSwiper from "@/components/food-swiper";
import QuantityInput from "@/components/quantity-input";
import PopularMenu from "@/components/sections/popular-menu";
import { useGetAllProducts, useSingleProduct } from "@/hooks/product.hook";
import { useDispatch } from "react-redux";
import { addItemToCart, ICartItem } from "@/redux/features/cartSlice/cartSlice";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/auth.hook";
import Loader from "@/components/Loader";
import Review from "@/components/review";
import { useProductReviews } from "@/hooks/review.hook";
import CardReview from "@/components/card-review";
import { useRouter } from "next/navigation";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const slug = params.id;
  // Add artificial loading state
  // const [artificialLoading, setArtificialLoading] = useState(true);

  const { data: allProductsResponse } = useGetAllProducts("", 1, null);
  const allProducts = allProductsResponse?.data;
  const { data: currentUser } = useCurrentUser();

  // // Set up artificial 1-minute loading delay
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setArtificialLoading(false);
  //   }, 60000); // 60 seconds = 1 minute

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const matchingProduct = allProducts.find(
        (item: { name: string }) =>
          item.name.toLowerCase().replace(/\s+/g, "-") === slug ||
          convertSlugToName(slug) === item.name.toLowerCase()
      );

      if (matchingProduct) {
        setProductId(matchingProduct.productId);
        console.log("Found matching product ID:", matchingProduct.productId);
      }
    }
  }, [allProducts, slug]);

  const { data: { data: product } = {}, isLoading: apiLoading } =
    useSingleProduct(productId || "");
  const { data: reviewsData, isLoading } = useProductReviews(productId || "");
  console.log("Reviews Data:", reviewsData);
  const dispatch = useDispatch();

  const handleRedirect = () => {
    router.push("/login");
  };

  // Combine the real loading state with our artificial one
  // const isLoading = apiLoading || artificialLoading;

  const handleAddToCart = () => {
    if (product && product.productId) {
      console.log("Starting addToCart process...");
      console.log("Product being added:", product);
      console.log("Selected quantity:", quantity);

      const cartItem: ICartItem = {
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        productPhoto: product.productPhoto,
        categoryId: product.categoryId,
        description: product.description,
      };

      console.log("Cart item being dispatched:", cartItem);

      // Assuming you have the userId available (you can retrieve it from the current user context or state)
      const userId = currentUser?.userID || null; // Replace with actual userId if available

      // Dispatch action with both cartItem and userId
      dispatch(addItemToCart({ item: cartItem, userId }));

      // Show success toast notification using sonner
      toast.success("Item added to cart successfully!");
      console.log("Item added to cart successfully");
    } else {
      console.error("Cannot add to cart: Product or productId is undefined");
    }
  };

  // Handle quantity change from QuantityInput
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  console.log("Fetched Product:", product);

  if (apiLoading) {
    return (
      <div className="text-center py-10 grid place-items-center mt-40">
        <p className="flex justify-center items-center h-screen">
          <Loader />
        </p>
        {/* <p className="mt-4 text-gray-500">Loading product details...</p>
        {artificialLoading && (
          <p className="mt-2 text-sm text-gray-400">
            (Testing extended loading state - will complete in 1 minute)
          </p>
        )} */}
      </div>
    );
  }

  if (!product && !apiLoading) {
    return (
      <div className="container pt-36">
        {" "}
        <p className="flex justify-center items-center h-screen">
          <Loader />
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pb-10 pt-28 lg:pb-20 lg:pt-36">
        <Breadcrumbs previousPath="Menu" currentPath={product?.name || ""} />
        <div className="mt-16 grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <div className="w-full">
            <FoodSwiper images={product?.productPhoto || []} />
          </div>
          <div>
            <h1 className="text-heading-3 lg:text-heading-1 text-secondary-100">
              {product?.name}
            </h1>
            <h5 className="text-heading-5 mt-4 text-secondary-100 lg:mt-8">
              Price
            </h5>
            <span className="text-caption-2 text-primary-100">
              ${product?.price}
            </span>
            <h5 className="text-heading-5 mt-8 text-secondary-100">
              Description
            </h5>
            <p className="text-body-2-regular mt-2 text-secondary-50">
              {product?.description || "No description"}
            </p>
            <div className="mt-6 flex space-x-3">
              <h5 className="text-heading-5 flex space-x-3">Quantity:</h5>
              <QuantityInput count={quantity} setCount={handleQuantityChange} />
            </div>
            <div className="mt-6 flex items-center space-x-3 ">
              <button className="btn-pink-solid" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <button
                className="btn-pink-outline !p-3"
                // onClick={() =>
                //   saveToLocalStorage({
                //     name: product?.name || null,
                //     image: product?.productPhoto?.[0] || null,
                //     price: product?.price || null,
                //   })
                // }
              >
                <AiOutlineHeart size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex flex-col gap-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : reviewsData?.data?.length === 0 ? (
            <div className="text-center py-8 text-black w-full">
              <div className="flex items-center justify-between">
                <h2 className="md:text-heading-3 text-heading-6 text-secondary-100">
                  Customer Reviews
                </h2>
                {currentUser ? (
                  <Review productId={productId} />
                ) : (
                  <div className="font-figtree font-semibold text-md tracking-tighter">
                    Please{" "}
                    <span
                      className="cursor-pointer text-primary-100 hover:text-yellow-600 hover:underline"
                      onClick={handleRedirect}
                    >
                      Log in
                    </span>{" "}
                    to review
                  </div>
                )}
              </div>
              <p>
                {currentUser ? (
                  "No reviews yet"
                ) : (
                  <>
                    <p className="md:text-heading-3 text-heading-6 mt-8">
                      No reviews yet
                    </p>
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between">
                <h2 className="md:text-heading-3 text-heading-6 text-secondary-100">
                  Customer Reviews
                </h2>
                {currentUser ? (
                  <Review productId={productId} />
                ) : (
                  <div className="font-figtree font-semibold text-md tracking-tighter">
                    Please{" "}
                    <span
                      className="cursor-pointer text-primary-100 hover:text-yellow-600 hover:underline"
                      onClick={handleRedirect}
                    >
                      Log in
                    </span>{" "}
                    to review
                  </div>
                )}
              </div>
              {reviewsData?.data?.map((review) => (
                <CardReview
                  key={review.reviewId}
                  user={{
                    name: review.user.name,
                    profilePhoto:
                      review.user.profilePhoto || "/default-avatar.png",
                  }}
                  createdAt={review.createdAt}
                  rating={review.rating}
                  title={`Review by ${review.user.name}`}
                  content={review.content}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <PopularMenu />
    </div>
  );
}
