"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useGetAllUser } from "@/hooks/user.hook";
import useDebounce from "@/lib/utils/useDebounce";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner"; 
import { useBlockUser } from "@/hooks/user.hook";
import Loading from "./loading";

type User = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  role: string;
  mobile: number;
  createdAt: string;
  isBlocked: boolean;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "User ID", accessor: "id", className: "hidden md:table-cell" },
  { header: "Role", accessor: "role", className: "hidden md:table-cell" },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "mobile", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const AllUserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlocked] = useState("");

  const searchTermText = useDebounce(searchTerm, 500);

  const { data: allUserData, isLoading } = useGetAllUser(
    searchTermText,
    isBlocked,
    currentPage
  );

  const { mutate: blockUser } = useBlockUser();

  const handleBlockUnblock = (userId: string, isBlocked: boolean) => {
    blockUser(userId, {
      onSuccess: () => {
        toast.success(
          `User ${isBlocked ? "unblocked" : "blocked"} successfully`
        );
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  const renderRow = (item: User) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.profilePhoto || "/default-user.png"}
          alt="User Avatar"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <h3 className="font-semibold">{item.email}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell p-4">{item.id}</td>
      <td className="hidden md:table-cell p-4">{item.role}</td>
      <td className="hidden md:table-cell p-4">
        {item.isBlocked ? "Blocked" : "Active"}
      </td>
      <td className="hidden lg:table-cell p-4">{item.mobile}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {item.isBlocked === true ? (
            <button
              onClick={() => handleBlockUnblock(item.id, item.isBlocked)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
            >
              <Image
                src="/unlocked.png"
                alt="Unblock"
                width={20}
                height={20}
                className="text-red-500"
              />
            </button>
          ) : (
            <button
              onClick={() => handleBlockUnblock(item.id, item.isBlocked)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
            >
              <Image
                src="/block.png"
                alt="Block"
                width={20}
                height={20}
                className="text-red-500"
              />
            </button>
          )}
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
            value={searchTerm} // Pass value prop here
            onChange={(e) => setSearchTerm(e.target.value)} // Handle onChange for input
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
            data={allUserData?.data || []}
          />

          <Pagination
            currentPage={currentPage}
            totalPage={allUserData?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllUserPage;
