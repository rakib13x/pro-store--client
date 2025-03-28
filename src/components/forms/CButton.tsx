import React from "react";
interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  isPending?: boolean;
}
const CButton = ({ type, text, isPending = false }: ButtonProps) => {
  return (
    <div>
      <button disabled={isPending} type={type}>
        {isPending ? "Processing.." : text}
      </button>
    </div>
  );
};

export default CButton;
