import { use } from "react";
import ProductDetails from "./ProductDetails";

export default function Menupage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ProductDetails slug={id} />;
}
