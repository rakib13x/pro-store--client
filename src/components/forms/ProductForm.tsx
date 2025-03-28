/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/product.hook"; // adjust the import path as needed
import { toast } from "sonner";

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
  categoryPhoto: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Category image is required",
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
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: zodResolver(productSchema),
  });

  // Watch file inputs for preview; these values are FileLists
  const productPhotoFiles = watch("productPhoto");
  const categoryPhotoFiles = watch("categoryPhoto");

  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [categoryPreview, setCategoryPreview] = useState<string | null>(null);

  useEffect(() => {
    if (productPhotoFiles && productPhotoFiles.length > 0) {
      const file = productPhotoFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setProductPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setProductPreview(null);
    }
  }, [productPhotoFiles]);

  useEffect(() => {
    if (categoryPhotoFiles && categoryPhotoFiles.length > 0) {
      const file = categoryPhotoFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setCategoryPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setCategoryPreview(null);
    }
  }, [categoryPhotoFiles]);

  // Use our mutation hook to create a product
  const { mutate: createProductMutation } = useCreateProduct();

  const onSubmit = handleSubmit((formData) => {
    const productFormData = new FormData();
    productFormData.append("name", formData.name);
    productFormData.append("price", String(formData.price));
    productFormData.append("description", formData.description);
    productFormData.append("quantity", String(formData.quantity));
    productFormData.append("category", formData.category);
    if (formData.productPhoto && formData.productPhoto.length > 0) {
      productFormData.append("productPhoto", formData.productPhoto[0]);
    }
    if (formData.categoryPhoto && formData.categoryPhoto.length > 0) {
      productFormData.append("categoryPhoto", formData.categoryPhoto[0]);
    }

    createProductMutation(productFormData, {
      onSuccess: (data) => {
        toast.success("Product created successfully!");
        reset(); // reset form on success
      },
      onError: (error: any) => {
        console.error(
          "Error creating product:",
          error.response?.data || error.message
        );
        toast.error(
          "Error creating product. Please check the details and try again."
        );
      },
    });
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
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
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
      {/* Product Image Upload */}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          htmlFor="productPhoto"
        >
          <Image src="/upload.png" alt="Upload Icon" width={28} height={28} />
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
        {productPreview && (
          <div className="mt-2">
            <Image
              src={productPreview}
              alt="Product Preview"
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
      {/* Category Image Upload */}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          htmlFor="categoryPhoto"
        >
          <Image src="/upload.png" alt="Upload Icon" width={28} height={28} />
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
        {categoryPreview && (
          <div className="mt-2">
            <Image
              src={categoryPreview}
              alt="Category Preview"
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ProductForm;
