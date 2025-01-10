import Image from "next/image";
import Link from "next/link";
import FoodData from "../../public/json/food.json";

const EmptyState = () => {
  return (
    <>
      <div className="mx-auto grid w-1/2 grid-cols-3 gap-x-10 gap-y-2.5 lg:gap-x-16 lg:gap-y-4">
        {FoodData.map(
          (food, index) =>
            food.category !== "All" && (
              <Image
                key={index}
                src={`/assets/img/${food.image}`}
                alt="Food"
                width={130}
                height={130}
              />
            )
        )}
      </div>
      <div className="mx-auto mt-8 w-2/3 text-center">
        <h3 className="text-heading-5 lg:text-heading-3 text-secondary-100">
          Your Sweet Indulgences Await!
        </h3>
        <p className="text-body-2-regular mt-4 text-secondary-50">
          Welcome to your favorites page! Here, you can keep track of all your
          beloved desserts from our delectable selection. Whether you have a
          soft spot for chocolatey treats, crave creamy delights, or savor
          fruity delicacies, this is the place to save and organize your
          favorites. Simply click the heart icon next to the desserts you love,
          and they&lsquo;ll be stored here for quick access whenever your sweet
          tooth strikes.
        </p>
        <Link href="/menu" className="btn-pink-outline mt-6 inline-block">
          Explore Irresistible Desserts
        </Link>
      </div>
    </>
  );
};

export default EmptyState;
