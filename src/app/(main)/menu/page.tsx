import PageTitle from "@/components/page-title";
import FoodMenu from "@/components/sections/food-menu";

export default function Menu() {
  return (
    <>
      <PageTitle path="Menu" title="Our Menu" />
      <div className="container">
        <FoodMenu />
      </div>
    </>
  );
}
