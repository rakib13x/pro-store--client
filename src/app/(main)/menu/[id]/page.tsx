import React from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <div>{id && <ProductDetails params={{ id: id }} />}</div>;
};

export default ProductDetailsPage;
