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

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const slug = params.id;

  const { data: allProductsResponse } = useGetAllProducts("", 1, null);
  const allProducts = allProductsResponse?.data;

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

  const { data: { data: product } = {}, isLoading } = useSingleProduct(
    productId || ""
  );
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
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
      dispatch(addItemToCart(cartItem));
      console.log("Item added to cart successfully");
    } else {
      console.error("Cannot add to cart: Product is undefined");
    }
  };

  // Handle quantity change from QuantityInput
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  console.log("Fetched Product:", product);

  if (isLoading) {
    return <div className="container pt-36">Loading product details...</div>;
  }

  if (!product && !isLoading) {
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
            <div className="mt-6 flex space-x-6">
              <button className="btn-pink-solid grow" onClick={handleAddToCart}>
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

      <PopularMenu />
    </div>
  );
}
