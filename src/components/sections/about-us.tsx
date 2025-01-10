import Image from "next/image";
import AboutUs1 from "../../../public/assets/img/about-us-1.jpg";
import AboutUs2 from "../../../public/assets/img/about-us-2.jpg";
import { JSX } from "react";

function AboutUs({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <section id="about-us">
      <div className="py-10 lg:py-20">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-0">
          <div className="grid grid-cols-2 gap-x-4 lg:gap-x-7">
            <Image src={AboutUs1} alt="Boy" className="rounded-2xl" />
            <Image
              src={AboutUs2}
              alt="Girl"
              className="mt-10 rounded-2xl lg:mt-12"
            />
          </div>
          <div>
            <h3 className="text-caption-2 lg:text-caption-1 text-primary-100 lg:pt-5">
              About us
            </h3>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

const Subtitle = ({ children }: { children: string }) => (
  <h2 className="text-heading-4 lg:text-heading-2 mt-2">{children}</h2>
);

const Text = ({ children }: { children: string }) => (
  <p className="text-body-2-regular mt-4 text-secondary-50 lg:w-[436px]">
    {children}
  </p>
);

const Button = ({ children }: { children: string }) => (
  <button className="btn-pink-outline mt-6 w-fit">{children}</button>
);

AboutUs.Subtitle = Subtitle;
AboutUs.Text = Text;
AboutUs.Button = Button;

export default AboutUs;
