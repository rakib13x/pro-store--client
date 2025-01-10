const DiscountBanner = () => {
	return (
		<div className="rounded-[32px] bg-primary-100 bg-[url('/assets/img/doodle.png')] bg-cover bg-no-repeat py-14 pl-8 pr-11">
			<h5 className="text-heading-5 text-white">Limited Time Offer</h5>
			<h1 className="mt-1.5 w-[216px] font-fredoka-one text-[54px] leading-tight tracking-tight text-white">
				Get 50% Off!
			</h1>
			<p className="text-body-2-regular mt-3 w-[216px] text-white">
				enjoy a 50% discount on all our premium features
			</p>
			<button className="btn-yellow-solid mt-4">Get it now</button>
		</div>
	);
};

export default DiscountBanner;
