"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

// Update the prop type to handle string or array
const FoodSwiper = ({ images }: { images: string | string[] }) => {
  // Convert to array if string is provided
  const imageArray = Array.isArray(images) ? images : [images];

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
        el: ".bullet",
        bulletClass: "h-3 w-3 rounded-full bg-primary-50 cursor-pointer",
        bulletActiveClass: "!bg-primary-100",
      }}
    >
      {imageArray.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image.startsWith("http") ? image : `/assets/img/${image}`}
            alt="Food Preview Image"
            width={500}
            height={500}
            className="mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FoodSwiper;
