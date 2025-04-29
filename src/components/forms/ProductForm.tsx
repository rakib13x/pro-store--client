/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/product.hook"; // adjust the import path as needed
import { toast } from "sonner";
import CInput from "./CInput";
import { useGetAllCategories } from "../../hooks/category.hook";
import CSelect from "./CSelect";
import CImageInput from "./CImage";
import CForm from "./CForm";
import CButton from "./CButton";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";

// Preprocess number inputs so that string values from inputs are converted to numbers.
const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "Price must be a number!" }).min(0, {
      message: "Price must be non-negative!",
    })
  ),
  description: z.string().min(1, { message: "Description is required!" }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "Quantity must be a number!" }).min(0, {
      message: "Quantity must be non-negative!",
    })
  ),
  category: z.string().min(1, { message: "Category is required!" }),
  productPhoto: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Product image is required",
    })
    .optional(),
});

type ProductInputs = z.infer<typeof productSchema>;

const ProductForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: zodResolver(productSchema),
  });

  // Use our mutation hook to create a product
  const { mutate, isPending } = useCreateProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTermText, setSearchTermText] = useState("");
  const { data: CategoryData } = useGetAllCategories(
    searchTermText,
    currentPage
  );

  if (!CategoryData) {
    return <p>Loading categories...</p>;
  }



  const onFromSubmit = async (data: FieldValues) => {
    const {
      productPhoto: imageFiles,
      categoryId,
      price,
      quantity,
      ...otherData
    } = data;

    // Ensure price and quantity are numbers
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      toast.error("Price and Quantity must be valid numbers.");
      return;
    }

    // Upload the image and get the URL
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

    if (imageUrls && imageUrls.length > 0) {
      const imageUrl = imageUrls[0];

      if (imageUrl) {
        mutate(
          {
            ...otherData,
            productPhoto: imageUrl,
            categoryId,
            price: parsedPrice,
            quantity: parsedQuantity,
          },
          {
            onSuccess: () => {
              toast.success("Product created successfully.");
            },
            onError: () => {
              toast.error("Something went wrong! Try again.");
            },
          }
        );
      } else {
        toast.error("Something went wrong! Try again.");
      }
    }
  };

  return (
    <CForm onFromSubmit={onFromSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "Create New Product" : "Update Product"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <CInput name="name" label="Product Name" type="text"></CInput>
        <CInput
          name="description"
          label="Product Description"
          type="text"
        ></CInput>
        <CInput name="price" label="Price" type="number"></CInput>
        <CInput name="quantity" label="Quantity" type="number"></CInput>
        <CSelect
          options={
            Array.isArray(CategoryData?.data)
              ? (
                  CategoryData.data as unknown as {
                    name: string;
                    categoryId: string;
                  }[]
                ).map((info) => ({
                  label: info.name,
                  value: info.categoryId,
                }))
              : [] // Safely fallback to an empty array if no categories are available
          }
          label="Category"
          text="Select Category"
          name="categoryId"
        />
      </div>

      {/* Product Image Upload */}
      <div className="flex flex-col mt-3 w-full md:w-1/4">
        <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer text-nowrap"
          htmlFor="productPhoto"
        >
          <Image src="/upload.png" alt="Upload Icon" width={28} height={28} />
          <span>Upload product image</span>
        </label>
        <CImageInput name="productPhoto" label=""></CImageInput>
        {errors.productPhoto?.message && (
          <p className="text-xs text-red-400">
            {errors.productPhoto.message.toString()}
          </p>
        )}
      </div>
      <CButton isPending={isPending} type="submit" text="Add Product"></CButton>
    </CForm>
  );
};

export default ProductForm;
