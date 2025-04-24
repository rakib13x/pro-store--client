/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { convertNameToSlug } from "@/utils/helper";
import { useGetTopSellingProducts } from "@/hooks/product.hook";
import { useDispatch } from "react-redux";
import { addItemToCart, ICartItem } from "@/redux/features/cartSlice/cartSlice";
import { toast } from "sonner";

export default function PopularMenu() {
  const { data: PopularFoodResponse, isLoading } = useGetTopSellingProducts();
  const dispatch = useDispatch();

  const handleAddToCart = (food: any) => {
    const cartItem: ICartItem = {
      productId: food.productId,
      name: food.name,
      price: food.price,
      quantity: 1,
      productPhoto: food.productPhoto,
      categoryId: food.categoryId,
      description: food.description,
    };

    dispatch(addItemToCart({ item: cartItem }));
    toast.success("Item added to cart successfully!");
  };

  const products = PopularFoodResponse?.data ?? [];

  return (
    <section id="popular-menu">
      <div className="py-10 lg:px-12 lg:py-20">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
          Popular Menu
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
          Most Popular Food
        </h2>

        {/* You might want to show a loading state */}
        {isLoading && (
          <p className="text-center mt-8 text-body-1">Loading popular items…</p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-x-20">
          {products.map((food) => (
            <div key={food.productId} className="text-center">
              <Image
                src={food.productPhoto}
                width={200}
                height={200}
                alt={food.name}
                className="mx-auto"
              />
              <div className="group/food">
                <Link
                  href={`/menu/${convertNameToSlug(food.name)}`}
                  className="lg:text-heading-5 text-body-1 peer !font-bold hover:text-primary-100 hover:underline"
                >
                  {food.name}
                </Link>
                <h3 className="text-caption-2 text-primary-100">
                  ${food.price}
                </h3>
                <div className="mt-3 flex justify-center space-x-2.5 opacity-0 transition-opacity duration-200 group-hover/food:opacity-100 peer-hover:opacity-100">
                  <button className="group rounded-full border border-primary-100 px-2 py-2 transition duration-300 hover:bg-primary-100">
                    <FiHeart
                      size="20px"
                      className="text-primary-100 transition duration-300 group-hover:text-white"
                    />
                  </button>
                  <button
                    className="text-body-3-medium rounded-[32px] bg-primary-100 px-5 py-3 text-white shadow-lg shadow-[#AE1339]/30 transition duration-300 hover:bg-additional-yellow hover:text-secondary-100 lg:px-10 lg:py-3"
                    onClick={() => handleAddToCart(food)} // Add to cart action
                  >
                    <FiShoppingCart className="lg:hidden" />
                    <span className="hidden lg:block">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 w-fit lg:mt-20">
          <Link href="/menu" className="btn-pink-outline">
            See All Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
