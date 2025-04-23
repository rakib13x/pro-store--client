/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { BsGridFill } from "react-icons/bs";
import { convertNameToSlug } from "@/utils/helper";
import { useGetAllProducts } from "@/hooks/product.hook";
import { useGetAllCategories } from "@/hooks/category.hook";
import DiscountBanner from "../discount-banner";
import Loader from "../Loader";

export default function FoodMenu() {
  const [search] = useState("");
  const [page] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { data: categoriesData } = useGetAllCategories(search, page);

  const { data: ProductData, isLoading: isProductsLoading } = useGetAllProducts(
    search,
    page,
    selectedCategoryId
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = categoriesData?.data || [];

  const totalProductCount = useMemo(() => {
    if (!categories.length) return 0;
    return categories.reduce((sum: number, category: any) => {
      return sum + (category._count?.product || 0);
    }, 0);
  }, [categories]);

  const findSelectedTabIndex = () => {
    if (selectedCategory === "All") return 0;
    const index = categories.findIndex(
      (c: any) => c.categoryId === selectedCategoryId
    );
    return index === -1 ? 0 : index + 1;
  };

  const handleCategoryChange = (
    categoryName: string,
    categoryId: string | null
  ) => {
    console.log(`Changing category to: ${categoryName}, ID: ${categoryId}`);
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
  };

  const renderProducts = () => {
    if (isProductsLoading) {
      return (
        <div className="text-center py-10 grid place-items-center mt-40">
          <Loader />
        </div>
      );
    }

    return (
      <div className="mt-8 grid grid-cols-2 gap-10 lg:grid-cols-3 lg:gap-16">
        {ProductData?.data && ProductData.data.length > 0 ? (
          ProductData.data.map((product: any) => (
            <div key={product.productId} className="text-center">
              <Image
                src={product.productPhoto || ""}
                width={200}
                height={200}
                alt={product.name}
                className="mx-auto"
              />
              <Link
                href={`menu/${convertNameToSlug(product.name)}`}
                className="text-heading-6 lg:text-heading-5 mt-3 text-secondary-100 hover:text-primary-100 hover:underline"
              >
                {product.name}
              </Link>
              <h3 className="text-caption-2 text-primary-100">
                ${product.price}
              </h3>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-red-500">No products found in this category.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pb-20 lg:pb-36 lg:pt-20">
      <Tab.Group
        selectedIndex={findSelectedTabIndex()}
        onChange={(index) => {
          if (index === 0) {
            handleCategoryChange("All", null);
          } else if (categories[index - 1]) {
            const category = categories[index - 1];
            handleCategoryChange(category.name, category.categoryId);
          }
        }}
      >
        <div className="flex flex-col space-y-14 lg:flex-row lg:space-x-20 lg:space-y-0">
          {/* Categories Section */}
          <div className="w-full lg:w-1/4">
            <h5 className="text-heading-5 text-secondary-50">Categories</h5>
            <Tab.List className="mt-6 flex w-full flex-row space-x-4 overflow-y-auto pb-5 lg:flex-col lg:space-x-0 lg:space-y-4 lg:pb-0">
              {/* "All" Category Tab */}
              <Tab as={Fragment} key="all">
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? "bg-primary-100 outline-0" : ""
                    } group flex w-52 shrink-0 space-x-4 rounded-2xl border border-secondary-10 px-3 py-3.5 text-left transition duration-300 hover:bg-primary-100 lg:w-full`}
                  >
                    <BsGridFill
                      className={`${
                        selected ? "text-white" : "text-primary-100"
                      } ml-2 group-hover:text-white`}
                      size="48px"
                    />
                    <div>
                      <h5
                        className={`${
                          selected ? "text-white" : "text-secondary-100"
                        } text-heading-5 leading-none group-hover:text-white`}
                      >
                        All
                      </h5>
                      <span
                        className={`${
                          selected ? "text-white" : "text-primary-100"
                        } text-caption-2 group-hover:text-white`}
                      >
                        {totalProductCount} Menu
                      </span>
                    </div>
                  </button>
                )}
              </Tab>

              {/* Category Tabs */}
              {categories.map((cat: any) => (
                <Tab as={Fragment} key={cat.categoryId}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected ? "bg-primary-100 outline-0" : ""
                      } group flex w-52 shrink-0 space-x-4 rounded-2xl border border-secondary-10 px-3 py-3.5 text-left transition duration-300 hover:bg-primary-100 lg:w-full`}
                    >
                      <Image
                        src={cat.image || ""}
                        alt={cat.name}
                        width={56}
                        height={56}
                      />
                      <div>
                        <h5
                          className={`${
                            selected ? "text-white" : "text-secondary-100"
                          } text-heading-5 leading-none group-hover:text-white`}
                        >
                          {cat.name}
                        </h5>
                        <span
                          className={`${
                            selected ? "text-white" : "text-primary-100"
                          } text-caption-2 group-hover:text-white`}
                        >
                          {cat?._count.product} Menu
                        </span>
                      </div>
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <div className="mt-20 hidden lg:block">
              <DiscountBanner />
            </div>
          </div>

          {/* Food Items Section */}
          <div className="w-full lg:w-3/4">
            <Tab.Panels>
              {/* Create a Tab.Panel for "All" category */}
              <Tab.Panel>
                <div className="flex items-center justify-between">
                  <h3 className="text-heading-4 lg:text-heading-3 text-secondary-100">
                    All Menu
                  </h3>
                </div>
                {renderProducts()}
              </Tab.Panel>

              {/* Create a Tab.Panel for each category */}
              {categories.map((category: any) => (
                <Tab.Panel key={category.categoryId}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-heading-4 lg:text-heading-3 text-secondary-100">
                      {category.name} Menu
                    </h3>
                  </div>
                  {renderProducts()}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
      <div className="mt-20 block lg:hidden">
        <DiscountBanner />
      </div>
    </div>
  );
}
