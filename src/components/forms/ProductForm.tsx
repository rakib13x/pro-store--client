/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

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
    .instanceof(File, { message: "Product image is required" })
    .optional(),
  categoryPhoto: z
    .instanceof(File, { message: "Category image is required" })
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
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // Here you can call your API to create/update the product
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create New Product" : "Update Product"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Product Information
      </span>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Product Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Product Description"
          name="description"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Price"
          name="price"
          type="number"
          defaultValue={data?.price}
          register={register}
          error={errors?.price}
        />
        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          defaultValue={data?.quantity}
          register={register}
          error={errors?.quantity}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Category Name"
          name="category"
          defaultValue={data?.category}
          register={register}
          error={errors?.category}
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          htmlFor="productPhoto"
        >
          <Image src="/upload.png" alt="" width={28} height={28} />
          <span>Upload product image</span>
        </label>
        <input
          type="file"
          id="productPhoto"
          {...register("productPhoto")}
          className="hidden"
        />
        {errors.productPhoto?.message && (
          <p className="text-xs text-red-400">
            {errors.productPhoto.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          htmlFor="productPhoto"
        >
          <Image src="/upload.png" alt="" width={28} height={28} />
          <span>Upload Category image</span>
        </label>
        <input
          type="file"
          id="categoryPhoto"
          {...register("categoryPhoto")}
          className="hidden"
        />
        {errors.categoryPhoto?.message && (
          <p className="text-xs text-red-400">
            {errors.categoryPhoto.message.toString()}
          </p>
        )}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ProductForm;
