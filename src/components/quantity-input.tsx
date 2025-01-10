"use client";

import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const QuantityInput = () => {
	const [count, setCount] = useState<number>(1);

	return (
		<div className="flex">
			<button
				className="rounded-s-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-primary-100 hover:text-white"
				onClick={() => count > 0 && setCount(count - 1)}
			>
				<BiMinus />
			</button>
			<input
				type="number"
				className="w-14 border border-secondary-10 px-4 text-center"
				value={count}
				onChange={() => setCount(count + 1)}
			/>
			<button
				className="rounded-e-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-primary-100 hover:text-white"
				onClick={() => setCount(count + 1)}
			>
				<BiPlus />
			</button>
		</div>
	);
};

export default QuantityInput;
