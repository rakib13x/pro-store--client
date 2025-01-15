"use client";

import { Message, Call, TimeCircle } from "react-iconly";
import PageTitle from "@/components/page-title";

export default function Contact() {
  return (
    <>
      <PageTitle path="Contact us" title="Contact us" />

      <div className="container">
        <div className="py-20 lg:pb-24 lg:pt-16">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-28 lg:gap-y-0">
            <div className="self-center">
              <span className="text-caption-2 lg:text-caption-1 text-primary-100">
                Contact us
              </span>
              <h2 className="text-heading-4 lg:text-heading-2 mt-4 text-secondary-100">
                Get in Touch with Us
              </h2>
              <p className="text-body-2-regular mt-4 text-secondary-50">
                We would love to hear from you! If you have any questions,
                feedback, or inquiries, feel free to reach out to our friendly
                team. We&lsquo;re here to assist you and provide the best
                possible customer service.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <Message />
                  </div>
                  <span className="text-body-1 text-secondary-100">
                    Email us : example@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <Call />
                  </div>
                  <span className="text-body-1 text-secondary-100">
                    Call : +123 45678910
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <TimeCircle />
                  </div>
                  <span className="text-body-1 text-secondary-100">
                    Working Hours : Monday - Friday, 08 am - 05 pm
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-secondary-10 px-5 py-10 lg:p-10">
              <h5 className="text-heading-5 border-b border-secondary-10 pb-8 text-secondary-100">
                Please use the contact details provided below to get in touch
                with us:
              </h5>
              <form className="mt-8 space-y-6">
                <input
                  type="text"
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Name"
                />
                <input
                  type="text"
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Email Address"
                />
                <textarea
                  rows={14}
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Message"
                />
                <button type="submit" className="btn-pink-solid w-full">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
