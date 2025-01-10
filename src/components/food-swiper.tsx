"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

const FoodSwiper = ({ images }: { images: string[] }) => {
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
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`/assets/img/${image}`}
            alt="Food Preview Image"
            width={500}
            height={500}
            className="mx-auto"
          />
        </SwiperSlide>
      ))}
      <div className="bullet mt-8 flex justify-center space-x-3" />
    </Swiper>
  );
};

export default FoodSwiper;
