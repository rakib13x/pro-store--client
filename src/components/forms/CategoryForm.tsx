/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreateCategory } from "@/hooks/category.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";
import CForm from "./CForm";
import CImageInput from "./CImage";
import CInput from "./CInput";
import CButton from "./CButton";

// Preprocess number inputs so that string values from inputs are converted to numbers.
const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required!" }),
  image: z.any().refine((files) => files?.length > 0, {
    message: "Category image is required",
  }),
});

type categoryInputs = z.infer<typeof categorySchema>;

const CategoryForm = ({
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
  } = useForm<categoryInputs>({
    resolver: zodResolver(categorySchema),
  });

  


  // const onSubmit = handleSubmit(async (formData) => {
  //   if (formData.image && formData.image.length > 0) {
  //     const imageFile = formData.image[0];
  //     await handleImageUpload(imageFile); // Upload the image to Cloudinary
  //   }

  //   const productFormData = new FormData();
  //   productFormData.append("name", formData.name);
  //   if (!categoryImageUrl) {
  //     toast.error("Category Image is not available"); // Pass the Cloudinary image URL
  //   }
  //   if (categoryImageUrl) {
  //     productFormData.append("image", categoryImageUrl); // Pass the Cloudinary image URL
  //   }

  //   console.log("FormData before submission:");
  //   for (let [key, value] of productFormData.entries()) {
  //     console.log(key, value);
  //   }

  //   createProductMutation(productFormData, {
  //     onSuccess: (data) => {
  //       toast.success("Product created successfully!");
  //       reset(); // Reset form on success
  //     },
  //     onError: (error: any) => {
  //       toast.error(
  //         "Error creating product. Please check the details and try again."
  //       );
  //     },
  //   });
  // });

  const { mutate, isPending } = useCreateCategory();

  const onFromSubmit = async (data: FieldValues) => {
    const { image: imageFiles, ...otherData } = data;
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

  if (imageUrls && imageUrls.length > 0) {
    // Pass only the first URL to the backend
    const imageUrl = imageUrls[0]

    if (imageUrl) {
      mutate(
        { ...otherData, image: imageUrl },
        {
          onSuccess: () => {
            toast.success("Category is Successfully added.");
          },
          onError: () => {
            toast.error("Something went wrong! Try again.");
          },
        }
      );
    } else {
      toast.error("Something went wrong! Try again.");
    }
  } };

  return (
    <CForm onFromSubmit={onFromSubmit}>
      <div className="grid gap-3">
        <CInput name="name" label="Category Name" type="text"></CInput>
        <CImageInput name="image" label="Product Image"></CImageInput>

        <CButton
          isPending={isPending}
          type="submit"
          text="Create Category"
        ></CButton>
      </div>
    </CForm>
  );
};
export default CategoryForm;
