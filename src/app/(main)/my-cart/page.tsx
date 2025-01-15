import Image from "next/image";
import Link from "next/link";
import { RxTrash } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import PageTitle from "@/components/page-title";
import QuantityInput from "@/components/quantity-input";

export default function MyCart() {
  return (
    <>
      <PageTitle bgColor="bg-white" path="My Cart" title="My Cart" />

      <div className="container">
        <div className="pb-20 pt-10 lg:py-24">
          <div className="block lg:hidden">
            <div className="border-b pb-8 pt-4">
              <Image
                src="/assets/img/food-1.png"
                alt="Food"
                width={150}
                height={150}
              />
              <div className="mt-3 flex items-center justify-between">
                <h5 className="text-heading-5 text-secondary-100">
                  Chococheese Cake
                </h5>
                <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                  <RxTrash
                    size={18}
                    className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                  />
                </button>
              </div>
              <div className="mt-7 grid grid-cols-2">
                <QuantityInput />
                <div className="flex space-x-9">
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Price
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.5
                    </span>
                  </div>
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Total
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b pb-8 pt-4">
              <Image
                src="/assets/img/food-2.png"
                alt="Food"
                width={150}
                height={150}
              />
              <div className="mt-3 flex items-center justify-between">
                <h5 className="text-heading-5 text-secondary-100">
                  Pink Donuts
                </h5>
                <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                  <RxTrash
                    size={18}
                    className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                  />
                </button>
              </div>
              <div className="mt-7 grid grid-cols-2">
                <QuantityInput />
                <div className="flex space-x-9">
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Price
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.8
                    </span>
                  </div>
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Total
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.8
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b pb-8 pt-4">
              <Image
                src="/assets/img/food-5.png"
                alt="Food"
                width={150}
                height={150}
              />
              <div className="mt-3 flex items-center justify-between">
                <h5 className="text-heading-5 text-secondary-100">
                  Pink Sweet
                </h5>
                <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                  <RxTrash
                    size={18}
                    className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                  />
                </button>
              </div>
              <div className="mt-7 grid grid-cols-2">
                <QuantityInput />
                <div className="flex space-x-9">
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Price
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.1
                    </span>
                  </div>
                  <div>
                    <h6 className="text-heading-6 text-start text-secondary-100">
                      Total
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $2.1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="hidden w-full table-auto lg:table">
            <thead>
              <tr>
                <th className="text-heading-6 border-b pb-4 text-start text-secondary-100">
                  Product
                </th>
                <th className="text-heading-6 border-b pb-4 text-start text-secondary-100">
                  Quantity
                </th>
                <th className="text-heading-6 border-b pb-4 text-start text-secondary-100">
                  Price
                </th>
                <th className="text-heading-6 border-b pb-4 text-start text-secondary-100">
                  Total
                </th>
                <th className="text-heading-6 border-b pb-4 text-start text-secondary-100"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b py-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/assets/img/food-1.png"
                      alt="Food"
                      width={100}
                      height={100}
                    />
                    <h5 className="text-heading-5 text-secondary-100">
                      Chococheese Cake
                    </h5>
                  </div>
                </td>
                <td className="border-b py-6">
                  <QuantityInput />
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.5</span>
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.5</span>
                </td>
                <td className="border-b py-6">
                  <button className="group flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                    <RxTrash
                      size={24}
                      className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                    />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b py-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/assets/img/food-2.png"
                      alt="Food"
                      width={100}
                      height={100}
                    />
                    <h5 className="text-heading-5 text-secondary-100">
                      Pink Donuts
                    </h5>
                  </div>
                </td>
                <td className="border-b py-6">
                  <QuantityInput />
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.8</span>
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.8</span>
                </td>
                <td className="border-b py-6">
                  <button className="group flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                    <RxTrash
                      size={24}
                      className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                    />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b py-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/assets/img/food-5.png"
                      alt="Food"
                      width={100}
                      height={100}
                    />
                    <h5 className="text-heading-5 text-secondary-100">
                      Pink Sweet
                    </h5>
                  </div>
                </td>
                <td className="border-b py-6">
                  <QuantityInput />
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.1</span>
                </td>
                <td className="border-b py-6">
                  <span className="text-caption-2 text-primary-100">$2.1</span>
                </td>
                <td className="border-b py-6">
                  <button className="group flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100">
                    <RxTrash
                      size={24}
                      className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-12 flex flex-col space-y-10 lg:flex-row lg:justify-between">
            <div>
              <h6 className="text-heading-6 text-secondary-100">Coupon</h6>
              <div className="mt-3 flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
                <input
                  type="text"
                  className="text-body-2-regular rounded-[100px] bg-primary-10 px-[18px] py-3.5 text-secondary-100 placeholder:text-secondary-50 focus:outline-primary-100"
                  placeholder="Coupon code"
                />
                <button className="btn-pink-solid w-fit">Apply Coupon</button>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="flex items-center justify-between">
                <h6 className="text-heading-6 text-secondary-100">Subtotal</h6>
                <span className="text-caption-2 text-primary-100">$7.4</span>
              </div>
              <div className="mt-10 flex items-center justify-between border-b border-secondary-10 pb-7">
                <h4 className="text-heading-4 text-secondary-100">Total</h4>
                <span className="text-caption-1 text-primary-100">$7.4</span>
              </div>
              <button className="btn-pink-solid mt-8 w-full">Checkout</button>
              <Link
                href="/menu"
                className="text-body-3-medium mt-6 flex space-x-1 text-primary-100"
              >
                <MdKeyboardArrowLeft />{" "}
                <span className="hover:underline">Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
