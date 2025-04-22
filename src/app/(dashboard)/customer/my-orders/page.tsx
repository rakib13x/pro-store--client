"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import useDebounce from "@/lib/utils/useDebounce";
import { useGetMyOrders } from "@/hooks/order.hook";
import { useState } from "react";

// import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye } from "lucide-react";
import Loading from "../../admin/all-products/Loading";
import { formatDateTime } from "@/lib/utils";

type OrderItem = {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
};

type Order = {
  orderId: string;
  userId: string;
  total: number;
  subTotal: number;
  discounts: number | null;
  shippingAddress: unknown;
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  transactionId: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

const columns = [
  { header: "Order ID", accessor: "orderId" },
  { header: "Date", accessor: "date" },
  { header: "Status", accessor: "status" },
  { header: "Items", accessor: "items", className: "hidden md:table-cell" },
  { header: "Total", accessor: "total" },
  { header: "Actions", accessor: "actions" },
];

const MyOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermText = useDebounce(searchTerm, 500);

  const { data: ordersResponse, isLoading } = useGetMyOrders(
    currentPage,
    limit,
    searchTermText
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderRow = (order: Order) => (
    <tr
      key={order.orderId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-50"
    >
      <td className="p-4">
        <span className="font-medium">#{order.orderId.substring(0, 8)}</span>
      </td>
      <td className="p-4">
        {formatDateTime(new Date(order.createdAt)).dateTime}
      </td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
            order.orderStatus
          )}`}
        >
          {order.orderStatus}
        </span>
      </td>
      <td className="hidden md:table-cell p-4">
        {order.orderItems.length}{" "}
        {order.orderItems.length === 1 ? "item" : "items"}
      </td>
      <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/orders/${order.orderId}`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <Eye size={16} className="text-blue-700" />
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // placeholder="Search by shipping address..."
          />
        </div>
      </div>

      {/* LIST */}
      {isLoading ? (
        <Loading />
      ) : ordersResponse?.data && ordersResponse.data.length > 0 ? (
        <>
          <Table
            columns={columns}
            renderRow={renderRow}
            data={ordersResponse.data || []}
          />

          <Pagination
            currentPage={currentPage}
            totalPage={ordersResponse?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />

          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {(currentPage - 1) * limit + 1} -{" "}
            {Math.min(currentPage * limit, ordersResponse?.meta?.total || 0)} of{" "}
            {ordersResponse?.meta?.total || 0} orders
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <p className="text-gray-500">
            {searchTermText
              ? "No orders match your search criteria"
              : "You haven't placed any orders yet"}
          </p>
          {searchTermText && (
            <button
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
