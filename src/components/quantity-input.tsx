"use client";

import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantityInputProps {
  count: number;
  setCount: (count: number) => void;
}

const QuantityInput = ({ count, setCount }: QuantityInputProps) => {
  // Handle decreasing quantity
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Handle increasing quantity
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Handle manual input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCount(value);
    }
  };

  return (
    <div className="flex">
      <button
        className="rounded-s-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-primary-100 hover:text-white"
        onClick={decrementCount}
      >
        <BiMinus />
      </button>
      <input
        type="number"
        className="w-14 border border-secondary-10 px-4 text-center"
        value={count}
        onChange={handleInputChange}
        min="1"
      />
      <button
        className="rounded-e-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-primary-100 hover:text-white"
        onClick={incrementCount}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default QuantityInput;
