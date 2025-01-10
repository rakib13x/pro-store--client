import Image from "next/image";
import Chef1 from "../../../public/assets/img/chef-1.png";
import Chef2 from "../../../public/assets/img/chef-2.png";
import Chef3 from "../../../public/assets/img/chef-3.png";

export default function OurChefs() {
  return (
    <section id="our-chef">
      <div className="py-10 lg:py-20">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100">
          Our Chefs
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center">
          Meet Our Talented Chefs
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-y-8 lg:mt-32 lg:grid-cols-3 lg:gap-x-[75px] lg:gap-y-0">
          <div className="mt-28 lg:mt-0">
            <div className="group flex h-[415px] justify-center rounded-[32px] bg-primary-50">
              <Image
                src={Chef1}
                alt="Chef"
                className="h-full w-fit origin-bottom scale-125 transition duration-300 lg:scale-100 lg:group-hover:scale-[1.2]"
              />
            </div>
            <div className="mt-6 text-center">
              <h5 className="text-heading-5 text-secondary-100">
                Chef Ethan Mitchell
              </h5>
              <h6 className="text-heading-6 mt-1 text-secondary-50">
                Executive Chef
              </h6>
            </div>
          </div>
          <div className="mt-28 lg:mt-0">
            <div className="group flex h-[415px] justify-center rounded-[32px] bg-primary-50">
              <Image
                src={Chef2}
                alt="Chef"
                className="h-full w-fit origin-bottom scale-125 transition duration-300 lg:scale-[1.2] lg:group-hover:scale-125"
              />
            </div>
            <div className="mt-6 text-center">
              <h5 className="text-heading-5 text-secondary-100">
                Chef Marcus Thompson
              </h5>
              <h6 className="text-heading-6 mt-1 text-secondary-50">
                Head Chef
              </h6>
            </div>
          </div>
          <div className="mt-28 lg:mt-0">
            <div className="group flex h-[415px] justify-center rounded-[32px] bg-primary-50">
              <Image
                src={Chef3}
                alt="Chef"
                className="h-full w-fit origin-bottom scale-125 transition duration-300 lg:scale-100 lg:group-hover:scale-[1.2]"
              />
            </div>
            <div className="mt-6 text-center">
              <h5 className="text-heading-5 text-secondary-100">
                Chef Alexander Scott
              </h5>
              <h6 className="text-heading-6 mt-1 text-secondary-50">
                Food Advocate
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
