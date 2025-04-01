"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetAllCategories } from "@/hooks/category.hook";

export default function Explore() {
  const [search] = useState("");
  const [page] = useState(1);
  const { data: CategoryData } = useGetAllCategories(search, page);

  return (
    <section id="explore">
      <div className="mx-auto px-11 pb-10 pt-20 lg:w-5/6 lg:pb-20 lg:pt-36">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
          Explore
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
          Our Delicious Menu
        </h2>
        <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-3">
          {CategoryData?.data?.map((category) => (
            <Link
              href="/"
              key={category.categoryId}
              className="rounded-2xl border border-secondary-10 px-16 py-5 transition duration-300 hover:border-primary-100 hover:shadow-lg hover:shadow-[#050C11]/20"
            >
              <Image
                src={category?.image || "/default-user.png"}
                width={130}
                height={130}
                alt="category Menu"
                className="mx-auto"
              />
              <h5 className="text-heading-5 text-center">{category.name}</h5>
              <h3 className="text-caption-2 text-center text-primary-100">
                {category.productCount} Menu
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
