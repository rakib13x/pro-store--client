import { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Details",
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className=" ">
      <main className="flex-1 wrapper pt-12">
        <OrderClient params={Promise.resolve({ id })} />
      </main>
    </div>
  );
};

export default page;
