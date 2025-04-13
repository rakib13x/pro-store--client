import { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Details",
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <OrderClient params={Promise.resolve({ id })} />
    </div>
  );
};

export default page;
