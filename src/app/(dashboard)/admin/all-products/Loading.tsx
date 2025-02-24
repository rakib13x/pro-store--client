import React from "react";

const Loading = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-5 animate-pulse">
      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-x-4">
          <thead>
            <tr>
              <th className="h-10 w-1/6 bg-gray-300 rounded px-4"></th>
              <th className="h-10 w-1/4 bg-gray-300 rounded px-4 hidden md:table-cell"></th>
              <th className="h-10 w-1/4 bg-gray-300 rounded px-4 hidden md:table-cell"></th>
              <th className="h-10 w-1/4 bg-gray-300 rounded px-4 hidden md:table-cell"></th>
              <th className="h-10 w-1/4 bg-gray-300 rounded px-4 hidden lg:table-cell"></th>
              <th className="h-10 w-1/4 bg-gray-300 rounded px-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 even:bg-slate-50 text-sm"
                >
                  {/* Column 1: Info */}
                  <td className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="w-[70px] h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-[150px] h-4 bg-gray-300 rounded"></div>
                    </div>
                  </td>
                  {/* Column 2: User ID (hidden on mobile) */}
                  <td className="p-4 hidden md:table-cell">
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </td>
                  {/* Column 3: Role (hidden on mobile) */}
                  <td className="p-4 hidden md:table-cell">
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </td>
                  {/* Column 4: Status (hidden on mobile) */}
                  <td className="p-4 hidden md:table-cell">
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </td>
                  {/* Column 5: Phone (hidden on mobile at lg breakpoint) */}
                  <td className="p-4 hidden lg:table-cell">
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </td>
                  {/* Column 6: Actions */}
                  <td className="p-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="p-4 flex items-center justify-between text-gray-500 mt-4">
        <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold">
          Prev
        </button>
        <div className="flex items-center gap-2 text-sm">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <button
                key={index}
                className="px-2 rounded-sm bg-slate-200 w-8 h-8"
              ></button>
            ))}
        </div>
        <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold">
          Next
        </button>
      </div>
    </div>
  );
};

export default Loading;
