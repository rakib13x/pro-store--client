import Image from "next/image";
import { FaStar } from "react-icons/fa";

import Cake from "../../../public/assets/img/hero-cake.png";
import Avatar1 from "../../../public/assets/img/avatar-1.png";
import Avatar2 from "../../../public/assets/img/avatar-2.png";
import Avatar3 from "../../../public/assets/img/avatar-3.png";
import Avatar4 from "../../../public/assets/img/avatar-4.png";
import ButtonGooglePlay from "../../../public/assets/img/btn-google-play.png";
import ButtonAppStore from "../../../public/assets/img/btn-app-store.png";
import Explore from "@/components/sections/explore";
import AboutUs from "@/components/sections/about-us";
import PopularMenu from "@/components/sections/popular-menu";
import Testimonial from "@/components/sections/testimonial";
import OurBlog from "@/components/sections/our-blog";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Start Main Section - Hero */}
      {/* Start Main Section - Hero */}
      <main className="relative bg-primary-10 lg:h-screen">
        <div className="bg-[url('/assets/img/hero-shape.png')] bg-contain bg-right bg-no-repeat lg:absolute lg:right-0 lg:h-screen">
          <Image
            src={Cake}
            alt="Cake"
            className="scale-90 pt-20 lg:-ml-10 lg:origin-top-right lg:scale-[.48] lg:pt-40 2xl:scale-[.60]"
          />
        </div>
        <div className="lg:flex lg:h-screen lg:items-center">
          <div className="container z-10 mt-0 lg:mt-14">
            <h3 className="text-caption-2 lg:text-caption-1 text-primary-100">
              Welcome to Fofood
            </h3>
            <h1 className="lg:text-heading-1 text-heading-3 mt-2 leading-[46px] text-secondary-100 lg:mt-4 lg:leading-[84px]">
              Super Delicious Food <br /> Special for You
            </h1>
            <p className="text-body-1 mt-2 text-secondary-50 lg:mt-6">
              Order your favorites food from anywhere and <br /> get delivery at
              your door
            </p>
            <div className="mt-4 flex space-x-4 lg:mt-8">
              <Link href="/menu">
                <button className="btn-pink-solid">Order Now</button>
              </Link>
              <button className="btn-pink-outline">Learn More</button>
            </div>
            <div className="mt-8 flex items-center space-x-4 lg:mt-16">
              <div className="flex -space-x-2 overflow-hidden">
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={Avatar1}
                  alt="avatar"
                />
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={Avatar2}
                  alt="avatar"
                />
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={Avatar3}
                  alt="avatar"
                />
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={Avatar4}
                  alt="avatar"
                />
              </div>
              <div>
                <p className="text-body-3-bold text-secondary-100">
                  Our Happy Customers
                </p>
                <div className="mt-2 flex items-center space-x-1">
                  <FaStar size="14px" className="text-additional-yellow" />
                  <p className="text-body-3-bold text-secondary-100">4.9</p>
                  <p className="text-body-3-regular text-secondary-100">
                    (12.8k reviews)
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pb-10 lg:mt-9 lg:pb-0">
              <p className="text-body-3-medium text-secondary-50">
                For Better Service Download Our Mobile App Now
              </p>
              <div className="mt-4 flex space-x-4">
                <button className="w-[175px]">
                  <Image src={ButtonGooglePlay} alt="Google Play" />
                </button>
                <button className="w-[175px]">
                  <Image src={ButtonAppStore} alt="Apple Store" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Start Main Section - Hero */}

      {/* Start Content Section */}
      <div className="container">
        {/* Section 1 - Explore */}
        <Explore />

        {/* Section 2 - About us */}
        <AboutUs>
          <AboutUs.Subtitle>Welcome to Fofood</AboutUs.Subtitle>
          <AboutUs.Text>
            Welcome to Fofood, where we&lsquo;re committed to combating food
            deserts. Our goal is to ensure everyone has access to fresh,
            healthy, and affordable food, regardless of their location. Join us
            in creating a brighter future for all.
          </AboutUs.Text>
          <AboutUs.Button>Read More</AboutUs.Button>
        </AboutUs>

        {/* Section 3 - Popular Menu */}
        <PopularMenu />
        {/* Section 4 - Testimonial */}
        <Testimonial />

        {/* Section 5 - Our Blog */}
        <OurBlog />
      </div>
      {/* End Content Section */}
    </>
  );
}
