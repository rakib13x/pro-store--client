import React from "react";
interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  isPending?: boolean;
}
const CButton = ({ type, text, isPending = false }: ButtonProps) => {
  return (
    <div>
      <button
        disabled={isPending}
        type={type}
        className="grid place-content-center w-full h-10 bg-primary-100 text-white hover:bg-yellow-400 hover:text-black  hover:transition-all rounded-md font-semibold text-sm hover:bg-lamaSky transition-all duration-300 ease-in-out "
      >
        {isPending ? "Processing.." : text}
      </button>
    </div>
  );
};

export default CButton;
