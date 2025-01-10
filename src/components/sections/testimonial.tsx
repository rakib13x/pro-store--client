"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import TestimonialData from "../../../public/json/testimonial.json";
import "swiper/css";

export default function Testimonial() {
  return (
    <section id="testimonial">
      <div className="py-10 lg:py-20">
        <div className="bg-[url('/assets/img/bg-testimonial.jpg')] bg-cover px-10 py-10 lg:px-64 lg:py-20">
          <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
            Testimonial
          </h3>
          <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
            What People Say
          </h2>
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: "#testimonial .bullet",
              bulletClass: "h-3 w-3 rounded-full bg-primary-50 cursor-pointer",
              bulletActiveClass: "!bg-primary-100",
            }}
          >
            {TestimonialData.map((item, index) => (
              <SwiperSlide
                key={index}
                className="mt-12 rounded-2xl bg-white px-6 py-8 text-center lg:px-20"
              >
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={`/assets/img/${item.image}`}
                  alt="avatar"
                  width={48} // Specify width
                  height={48} // Specify height
                />
                <p className="text-body-1 mt-4 !font-bold text-secondary-100">
                  It&lsquo;s very delicious!
                </p>
                <div className="mt-2 flex justify-center space-x-1.5">
                  <FaStar size="14px" className="text-additional-yellow" />
                  <FaStar size="14px" className="text-additional-yellow" />
                  <FaStar size="14px" className="text-additional-yellow" />
                  <FaStar size="14px" className="text-additional-yellow" />
                  <FaStar size="14px" className="text-additional-yellow" />
                </div>
                <p className="text-body-2-regular mt-4 text-secondary-50">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  venenatis a vel id tincidunt volutpat faucibus scelerisque.
                  Morbi eget turpis aliquet nunc, varius aliquam ipsum.
                </p>
                <p className="text-caption-4 mt-4 text-primary-100">
                  Trojan Fox
                </p>
              </SwiperSlide>
            ))}
            <div className="bullet mt-8 flex justify-center space-x-3" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
