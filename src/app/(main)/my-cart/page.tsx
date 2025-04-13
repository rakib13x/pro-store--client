"use client";
import Image from "next/image";
import Link from "next/link";
import { RxTrash } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import PageTitle from "@/components/page-title";
import QuantityInput from "@/components/quantity-input";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  increaseItem,
  decreaseItem,
  removeItemFromCart,
  setUserCart,
} from "@/redux/features/cartSlice/cartSlice";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth.hook";

export default function MyCart() {
  const { cartItems, subTotal, totalPriceBeforeDiscount, totalDiscount } =
    useAppSelector((state) => state.cartSlice);
  console.log("Sub Total Price is:", subTotal);
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState("");

  const { data: currentUser } = useCurrentUser(); // Using the current user data from the hook
  console.log("Current User:", currentUser?.userID);
  useEffect(() => {
    const fetchUserCart = () => {
      if (currentUser?.userID) {
        // Ensure that userId exists
        const userId = currentUser.userID; // Get the logged-in user's ID from the decoded token
        const cartData = localStorage.getItem(`cart_${userId}`); // Directly use userId here

        if (cartData) {
          const parsedCartData = JSON.parse(cartData);
          // Dispatch the setUserCart action to update the Redux store with the cart data
          dispatch(setUserCart(parsedCartData));
        } else {
          // If no cart data, ensure the Redux state is empty
          dispatch(setUserCart([]));
        }
      }
    };

    // Fetch the user's cart data if the currentUser is available
    if (currentUser) {
      fetchUserCart();
    }
  }, [dispatch, currentUser]);

  // Calculate item total price
  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  // Handle quantity change for cart items
  const handleQuantityChange = (
    productId: string,
    newQuantity: number,
    currentQuantity: number
  ) => {
    if (newQuantity > currentQuantity) {
      dispatch(increaseItem({ productId }));
    } else if (newQuantity < currentQuantity) {
      dispatch(decreaseItem({ productId }));
    }
  };

  // Handle remove item from cart
  const handleRemoveItem = (productId: string) => {
    if (currentUser?.userID) {
      // Ensure userId exists
      console.log("Removing item with productId:", productId);
      dispatch(removeItemFromCart({ productId, userId: currentUser.userID }));
    }
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Implement coupon logic here
      console.log("Applying coupon:", couponCode);
      // For example: dispatch(applyCoupon(couponCode));
    }
  };

  return (
    <>
      <PageTitle bgColor="bg-white" path="My Cart" title="My Cart" />
      <div className="container">
        <p className="text-red-blue">{cartItems.length} items in cart</p>
        <div className="pb-20 pt-10 lg:py-24">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <h3 className="text-heading-3 text-secondary-100 mb-4">
                Your cart is empty
              </h3>
              <p className="text-body-2-regular text-secondary-50 mb-8">
                Add items to your cart to proceed with your order
              </p>
              <Link href="/menu" className="btn-pink-solid">
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="block lg:hidden">
                {cartItems.map((item) => (
                  <div key={item.productId} className="border-b pb-8 pt-4">
                    {item.productPhoto ? (
                      <Image
                        src={item.productPhoto}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 w-[150px] h-[150px] flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <h5 className="text-heading-5 text-secondary-100">
                        {item.name}
                      </h5>
                      <button
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <RxTrash
                          size={18}
                          className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                        />
                      </button>
                    </div>
                    <div className="mt-7 grid grid-cols-2">
                      <QuantityInput
                        count={item.quantity}
                        setCount={(newQuantity) =>
                          handleQuantityChange(
                            item.productId,
                            newQuantity,
                            item.quantity
                          )
                        }
                      />
                      <div className="flex space-x-9">
                        <div>
                          <h6 className="text-heading-6 text-start text-secondary-100">
                            Price
                          </h6>
                          <span className="text-caption-2 text-primary-100">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <h6 className="text-heading-6 text-start text-secondary-100">
                            Total
                          </h6>
                          <span className="text-caption-2 text-primary-100">
                            $
                            {calculateItemTotal(
                              item.price,
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop View */}
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
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td className="border-b py-6">
                        <div className="flex items-center space-x-3">
                          {item.productPhoto ? (
                            <Image
                              src={item.productPhoto}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="object-cover"
                            />
                          ) : (
                            <div className="bg-gray-200 w-[100px] h-[100px] flex items-center justify-center">
                              No Image
                            </div>
                          )}
                          <h5 className="text-heading-5 text-secondary-100">
                            {item.name}
                          </h5>
                        </div>
                      </td>
                      <td className="border-b py-6">
                        <QuantityInput
                          count={item.quantity}
                          setCount={(newQuantity) =>
                            handleQuantityChange(
                              item.productId,
                              newQuantity,
                              item.quantity
                            )
                          }
                        />
                      </td>
                      <td className="border-b py-6">
                        <span className="text-caption-2 text-primary-100">
                          ${item.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="border-b py-6">
                        <span className="text-caption-2 text-primary-100">
                          $
                          {calculateItemTotal(
                            item.price,
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </td>
                      <td className="border-b py-6">
                        <button
                          className="group flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary-10 transition duration-200 hover:bg-primary-100"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <RxTrash
                            size={24}
                            className="text-[#FF0A0A] transition duration-200 group-hover:text-white"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="btn-pink-solid w-fit"
                      onClick={handleApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="flex items-center justify-between">
                    <h6 className="text-heading-6 text-secondary-100">
                      Subtotal
                    </h6>
                    <span className="text-caption-2 text-primary-100">
                      $
                      {totalPriceBeforeDiscount
                        ? totalPriceBeforeDiscount.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex items-center justify-between mt-4">
                      <h6 className="text-heading-6 text-secondary-100">
                        Discount
                      </h6>
                      <span className="text-caption-2 text-green-500">
                        -${totalDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="mt-10 flex items-center justify-between border-b border-secondary-10 pb-7">
                    <h4 className="text-heading-4 text-secondary-100">Total</h4>
                    <span className="text-caption-1 text-primary-100">
                      ${subTotal}
                    </span>
                  </div>
                  <button className="btn-pink-solid mt-8 w-full">
                    Checkout
                  </button>
                  <Link
                    href="/menu"
                    className="text-body-3-medium mt-6 flex space-x-1 text-primary-100"
                  >
                    <MdKeyboardArrowLeft />
                    <span className="hover:underline">Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
