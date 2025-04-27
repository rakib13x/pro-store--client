"use client";
import { useCurrentUser } from "@/hooks/auth.hook";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { logout } from "@/services/authService";
import { MdOutlineCategory } from "react-icons/md";

const product = <AiOutlineProduct className="text-gray-400 text-2xl " />;
const category = <MdOutlineCategory className="text-gray-400 text-2xl " />;

interface MenuItem {
  icon: string | ReactNode;
  label: string;
  visible: string[];
  isButton?: boolean;
  action?: string;
  href?: string; // Optional for button items
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const AdminMenuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
      {
        icon: product,
        label: "All Product",
        href: "/admin/all-products",
        visible: ["admin", "teacher"],
        isButton: false,
      },
      {
        icon: category,
        label: "All Categories",
        href: "/admin/all-categories",
        visible: ["admin", "teacher"],
        isButton: false,
      },
      {
        icon: "/student.png",
        label: "All Users",
        href: "/admin/all-user",
        visible: ["admin", "teacher"],
        isButton: false,
      },
      {
        icon: "/lesson.png",
        label: "All Blogs",
        href: "/admin/all-blogs",
        visible: ["admin", "teacher"],
        isButton: false,
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/admin/profile",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
      {
        icon: "/logout.png",
        label: "Logout",
        action: "logout",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: true,
      },
    ],
  },
];

const UserMenuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
      {
        icon: product,
        label: "My Order",
        href: "/customer/my-orders",
        visible: ["admin", "teacher"],
        isButton: false,
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/customer/profile",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: false,
      },
      {
        icon: "/logout.png",
        label: "Logout",
        action: "logout",
        visible: ["admin", "teacher", "student", "parent"],
        isButton: true,
      },
    ],
  },
];

const Menu = () => {
  const { data: userData } = useCurrentUser();
  const Role = userData?.role;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.push("/login");

      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render the menu item (either link or button)
  const renderMenuItem = (item: MenuItem) => {
    // Common icon rendering logic
    const renderIcon = () => {
      if (typeof item.icon === "string") {
        return (
          <Image src={item.icon} alt={item.label} width={20} height={20} />
        );
      } else {
        return <span>{item.icon}</span>;
      }
    };

    // Common class for styling
    const commonClasses =
      "flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight";

    // Render button for logout action
    if (item.isButton) {
      return (
        <button
          key={item.label}
          onClick={handleLogout}
          className={`${commonClasses} cursor-pointer`}
        >
          {renderIcon()}
          <span className="hidden lg:block">{item.label}</span>
        </button>
      );
    }

    // Render link for navigation items - href is guaranteed to exist for non-button items
    return (
      <Link
        href={item.href as string}
        key={item.label}
        className={commonClasses}
      >
        {renderIcon()}
        <span className="hidden lg:block">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="mt-4 text-sm">
      {Role === "SUPERADMIN" &&
        AdminMenuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {section.title}
            </span>
            {section.items.map((item) => (
              <div key={item.label}>{renderMenuItem(item)}</div>
            ))}
          </div>
        ))}
      {Role === "CUSTOMER" &&
        UserMenuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {section.title}
            </span>
            {section.items.map((item) => (
              <div key={item.label}>{renderMenuItem(item)}</div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Menu;
