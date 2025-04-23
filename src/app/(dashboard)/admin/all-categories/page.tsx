"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import useDebounce from "@/lib/utils/useDebounce";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCategory } from "@/hooks/category.hook";
import Loading from "../all-products/Loading";
import { useGetAllCategories } from "@/hooks/category.hook";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

type Category = {
  categoryId: string;
  name: string;
  quantity: number;
  image: string;
};

const columns = [
  { header: "Info", accessor: "info" },

  {
    header: "Quantity",
    accessor: "quantity",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const AllCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermText = useDebounce(searchTerm, 500);
  const { data: allCategoryData, isLoading } = useGetAllCategories(
    searchTermText,
    currentPage
  );

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  const renderRow = (item: Category) => (
    <tr
      key={item.categoryId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item?.image || "/default-user.png"}
          alt="Category Image"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell p-4">{item.quantity}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <FaRegEdit className="text-2xl" />
          </button>

          <button
            onClick={() => handleDelete(item.categoryId)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
          >
            <RiDeleteBinLine className="text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Categories
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-4 self-end">
            <FormModal table="category" type="create" />
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
            data={allCategoryData?.data || []}
          />

          <Pagination
            currentPage={currentPage}
            totalPage={allCategoryData?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllCategories;
