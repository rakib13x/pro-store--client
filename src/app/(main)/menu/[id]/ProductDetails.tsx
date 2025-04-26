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

export default function ProductDetails({ params }: { params: { id: string } }) {
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
  const dispatch = useDispatch();

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
        <Loader />
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
    return <div className="container pt-36">Product not found</div>;
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
              {product?.price}
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
            <div className="mt-6 flex flex-row space-x-3 ">
              <button className="btn-pink-solid2 " onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Review />
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

      <PopularMenu />
    </div>
  );
}
