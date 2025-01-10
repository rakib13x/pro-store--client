"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { convertSlugToName } from "@/utils/helper";
import Breadcrumbs from "@/components/breadcrumbs";
import FoodSwiper from "@/components/food-swiper";
import QuantityInput from "@/components/quantity-input";
import PopularMenu from "@/components/sections/popular-menu";
import FoodData from "../../../../public/json/food.json";

interface Food {
  name: string | null;
  image: string | null;
  price: string | null;
}

export default function DetailMenu({ params }: { params: { slug: string } }) {
  const allFood = FoodData.find((item) => item.category === "All");
  const data = allFood?.items?.find(
    (item) => item.name.toLowerCase() === convertSlugToName(params.slug)
  );

  const [favoriteFood, setFavoriteFood] = useState<Food[]>([]);

  useEffect(() => {
    const value = localStorage.getItem("favoriteFood") || "[]";
    setFavoriteFood(JSON.parse(value));
  }, []);

  const saveToLocalStorage = (food: Food) => {
    setFavoriteFood([...favoriteFood, food]);
    localStorage.setItem(
      "favoriteFood",
      JSON.stringify([...favoriteFood, food])
    );

    alert(`${food.name} is successfully added to My Favorites`);
  };

  return (
    <div className="container">
      <div className="pb-10 pt-28 lg:pb-20 lg:pt-36">
        <Breadcrumbs previousPath="Menu" currentPath={data?.name || ""} />
        <div className="mt-16 grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <div className="w-full">
            <FoodSwiper images={data?.images || []} />
          </div>
          <div>
            <h1 className="text-heading-3 lg:text-heading-1 text-secondary-100">
              {data?.name}
            </h1>
            <h5 className="text-heading-5 mt-4 text-secondary-100 lg:mt-8">
              Price
            </h5>
            <span className="text-caption-2 text-primary-100">
              {data?.price}
            </span>
            <h5 className="text-heading-5 mt-8 text-secondary-100">
              Description
            </h5>
            <p className="text-body-2-regular mt-2 text-secondary-50">
              {data?.desc || "No description"}
            </p>
            <div className="mt-6 flex space-x-3">
              <h5 className="text-heading-5 flex space-x-3">Quantity:</h5>
              <QuantityInput />
            </div>
            <div className="mt-6 flex space-x-6">
              <button className="btn-pink-solid grow">Add to Cart</button>
              <button
                className="btn-pink-outline !p-3"
                onClick={() =>
                  saveToLocalStorage({
                    name: data?.name || null,
                    image: data?.images[0] || null,
                    price: data?.price || null,
                  })
                }
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
