"use client";
import { useCurrentUser } from "@/hooks/auth.hook";
import Image from "next/image";

const DashBoardNavbar = () => {
  const { data: userData } = useCurrentUser();

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {userData?.userName}
          </span>
          <span className="text-[10px] text-gray-500 text-right">
            {userData?.role}
          </span>
        </div>
        <Image
          src={userData?.profilePhoto || "/avatar.png"}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default DashBoardNavbar;
