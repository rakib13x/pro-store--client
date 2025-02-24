"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import useDebounce from "@/lib/utils/useDebounce";
import Image from "next/image";
import { useState } from "react";
// import { toast } from "sonner";

import Loading from "./Loading";
import { useGetAllProducts } from "@/hooks/product.hook";

type Product = {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  productPhoto: string;
  category: {
    name: string;
    image: string;
  };
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Price", accessor: "price", className: "hidden md:table-cell" },
  {
    header: "Quantity",
    accessor: "quantity",
    className: "hidden md:table-cell",
  },
  {
    header: "Category",
    accessor: "category",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermText = useDebounce(searchTerm, 500);
  const { data: allProductData, isLoading } = useGetAllProducts(
    searchTermText,
    currentPage
  );

  console.log(allProductData);

  const renderRow = (item: Product) => (
    <tr
      key={item.productId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={
            item.productPhoto ? `/${item.productPhoto}` : "/default-user.png"
          }
          alt="User Avatar"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell p-4">{item.price}</td>
      <td className="hidden md:table-cell p-4">{item.quantity}</td>
      <td className="hidden md:table-cell p-4">{item?.category?.name}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            // onClick={() => handleBlockUnblock(item.id, item.isBlocked)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
          >
            <Image
              src="/update.png"
              alt="Unblock"
              width={20}
              height={20}
              className="text-red-500"
            />
          </button>

          <button
            // onClick={() => handleBlockUnblock(item.id, item.isBlocked)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
          >
            <Image
              src="/delete.png"
              alt="Block"
              width={20}
              height={20}
              className="text-red-500"
            />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Users</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-4 self-end">
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button> */}
            <FormModal table="user" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Table
            columns={columns}
            renderRow={renderRow}
            data={allProductData?.data || []}
          />

          <Pagination
            currentPage={currentPage}
            totalPage={allProductData?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllProducts;
