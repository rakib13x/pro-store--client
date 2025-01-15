"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { convertNameToSlug } from "@/utils/helper";
import PageTitle from "@/components/page-title";
import EmptyState from "@/components/empty-state";

interface Food {
  name: string;
  image: string;
  price: string;
}

export default function MyFavorites() {
  const [favoriteFood, setFavoriteFood] = useState<Food[]>([]);

  useEffect(() => {
    const value = localStorage.getItem("favoriteFood") || "[]";
    setFavoriteFood(JSON.parse(value));
  }, []);

  const removeFavoriteFood = (food: Food) => {
    favoriteFood.map((item, index) => {
      if (item.name === food.name) {
        favoriteFood.splice(index, 1);
        localStorage.setItem("favoriteFood", JSON.stringify(favoriteFood));
      }
    });
  };

  return (
    <>
      <PageTitle path="My Favorites" title="My Favorites" />

      <div className="container">
        <div className="py-20 lg:pb-36 lg:pt-24">
          {favoriteFood.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-x-20">
              {favoriteFood.map((food, index) => (
                <div key={index} className="relative text-center">
                  <button
                    className="group absolute right-16 flex h-10 w-10 items-center justify-center rounded-full border border-primary-100 transition duration-300 hover:bg-primary-100"
                    onClick={() => removeFavoriteFood(food)}
                  >
                    <AiFillHeart
                      size="24px"
                      className="text-primary-100 transition duration-300 group-hover:text-white"
                    />
                  </button>
                  <Image
                    src={`/assets/img/${food.image}`}
                    width={200}
                    height={200}
                    alt="Food"
                    className="mx-auto"
                  />
                  <div className="group/food">
                    <Link
                      href={`menu/${convertNameToSlug("food.name")}`}
                      className="lg:text-heading-5 text-body-1 peer !font-bold hover:text-primary-100 hover:underline"
                    >
                      {food.name}
                    </Link>
                    <h3 className="text-caption-2 text-primary-100">
                      {food.price}
                    </h3>
                    <div className="mt-3 flex justify-center space-x-2.5 opacity-0 transition-opacity duration-200 group-hover/food:opacity-100 peer-hover:opacity-100">
                      <button className="text-body-3-medium rounded-[32px] bg-primary-100 px-5 py-3 text-white shadow-lg shadow-[#AE1339]/30 transition duration-300 hover:bg-additional-yellow hover:text-secondary-100 lg:px-10 lg:py-3">
                        <FiShoppingCart className="lg:hidden" />
                        <span className="hidden lg:block">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
