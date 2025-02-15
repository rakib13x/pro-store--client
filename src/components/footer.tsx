"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Call, Message, TimeCircle } from "react-iconly";
import Logo from "../../public/assets/img/logo-white.png";
import ButtonGooglePlay from "../../public/assets/img/btn-google-play.png";
import ButtonAppStore from "../../public/assets/img/btn-app-store.png";
import QuickLinksData from "../../public/json/quick-links.json";

export default function Footer() {
  return (
    <footer className="bg-primary-100">
      <div className="bg-[url('/assets/img/doodle.png')] bg-contain lg:bg-top lg:bg-no-repeat">
        <div className="container divide-y divide-white/40">
          <div className="flex flex-col space-y-6 pb-8 pt-12 lg:flex-row lg:justify-between lg:space-y-0 lg:pb-16 lg:pt-20">
            <h2 className="text-heading-4 lg:text-heading-2 text-center leading-none text-white">
              Newsletter Subscribe
            </h2>
            <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-5 lg:space-y-0">
              <input
                type="text"
                placeholder="Email Address"
                className="text-body-2-medium w-full rounded-[32px] border border-white bg-transparent px-10 py-5 text-white placeholder:text-white focus:outline-0 focus:ring-1 focus:ring-white lg:w-96"
              />
              <button className="btn-white-solid w-fit leading-[normal]">
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="pb-14 pt-10 lg:py-16">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-[120px] lg:space-y-0">
              <div className="flex flex-col space-y-8">
                <Image src={Logo} alt="Logo" width="118" className="mb-2" />
                <div className="flex items-center space-x-1.5 text-white">
                  <Message size="small" />
                  <p className="text-body-2-regular !leading-none">
                    <span className="font-bold">Email us</span> :
                    example@gmail.com
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-white">
                  <Call size="small" />
                  <p className="text-body-2-regular !leading-none">
                    <span className="font-bold">Call</span> : 123 45678910
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-white">
                  <TimeCircle size="small" />
                  <p className="text-body-2-regular !leading-none">
                    <span className="font-bold">Working Hours</span> : Monday -
                    Friday, 08 am - 05 pm
                  </p>
                </div>
                <div className="flex space-x-5">
                  <Link
                    href="/"
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                  >
                    <FaFacebookF className="text-white transition duration-300 group-hover:text-secondary-100" />
                  </Link>
                  <Link
                    href="/"
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                  >
                    <FaInstagram className="text-white transition duration-300 group-hover:text-secondary-100" />
                  </Link>
                  <Link
                    href="/"
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                  >
                    <FaWhatsapp className="text-white transition duration-300 group-hover:text-secondary-100" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-0">
                {QuickLinksData.map((item, index) => (
                  <div key={index} className="flex flex-col space-y-6">
                    <p className="text-caption-2 text-white">{item.category}</p>
                    {item.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.path}
                        className="text-body-3 text-white hover:underline"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="col-span-2 flex flex-col space-y-6 lg:col-span-1">
                  <p className="text-caption-2 text-white">Download Our App</p>
                  <button className="w-[145px]">
                    <Image src={ButtonGooglePlay} alt="Google Play" />
                  </button>
                  <button className="w-[145px]">
                    <Image src={ButtonAppStore} alt="Apple Store" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6">
            <p className="text-body-2-regular text-center text-white">
              Copyright <span className="font-bold">Banana Studio</span> 2022
              All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
