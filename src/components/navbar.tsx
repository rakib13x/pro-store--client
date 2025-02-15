"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { VscClose, VscMenu } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { Buy, Heart } from "react-iconly";
import Logo from "../../public/assets/img/logo-color.png";
import navMenu from "../../public/json/nav-menu.json";
import { useCurrentUser } from "@/hooks/auth.hook";
import { logout } from "@/services/authService";
import { AuthContext } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: userData, isLoading } = useCurrentUser();
  const useLogOut = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [height, setHeight] = useState<any>(0);
  const ref = useRef<HTMLElement>(null);
  const queryClient = useQueryClient();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    setHeight(ref.current?.clientHeight || 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolling(false);
      } else if (window.scrollY > height) {
        setIsScrolling(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height]);

  const logOutUser = async () => {
    await logout();
    useLogOut?.setIsLoading(true);
    useLogOut?.setUser(null);
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    router.refresh();
  };

  return (
    <nav
      ref={ref}
      className={`${
        isScrolling || isOpen ? "bg-white/90 lg:bg-white" : "bg-transparent"
      } fixed z-20 w-full transition-all duration-500`}
    >
      <div className="container flex flex-col justify-between py-7 lg:flex-row lg:items-center lg:space-x-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              href="/my-cart"
              className="rounded-sm border border-secondary-100 p-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
            >
              <Buy style={{ height: "21px" }} />
            </Link>
            <Link
              href="/signup"
              className="rounded-sm border border-secondary-100 p-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
            >
              <IoIosLogIn style={{ height: "21px" }} />
            </Link>
            <button
              className="rounded-sm border border-secondary-100 px-3 py-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <VscClose size="21px" /> : <VscMenu size="21px" />}
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "h-[330px]" : "h-0"
          } flex flex-col overflow-hidden transition-all duration-300 lg:h-full lg:flex-row lg:items-center`}
        >
          <ul className="mt-12 flex flex-col space-y-6 lg:mt-0 lg:flex-row lg:space-x-16 lg:space-y-0">
            {navMenu.map((menu, index) => {
              const isActive =
                menu.pathname === "/"
                  ? pathname === menu.pathname
                  : pathname.startsWith(menu.pathname);

              return (
                <li key={index}>
                  {menu.submenu ? (
                    <Link href={menu.pathname}>
                      <Menu as="div">
                        <Menu.Button
                          className={`${
                            isActive
                              ? "text-primary-100"
                              : "text-secondary-100 hover:text-primary-100"
                          } text-body-2-medium flex items-center space-x-0.5 transition`}
                        >
                          <span>{menu.title}</span>
                          {/* <MdKeyboardArrowDown /> */}
                        </Menu.Button>
                        {/* <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items className="absolute mt-2 space-y-6 rounded-2xl bg-white p-5 drop-shadow-md">
                        {menu.submenu.map((submenu, index) => (
                          <Menu.Item key={index}>
                          {({}) => (
                            <Link
                            href={submenu.pathname}
                            onClick={() => setIsOpen(false)}
                            className="text-body-2-medium block text-secondary-100 hover:text-primary-100"
                            >
                            {submenu.title}
                            </Link>
                            )}
                            </Menu.Item>
                            ))}
                            </Menu.Items>
                            </Transition> */}
                      </Menu>
                    </Link>
                  ) : (
                    <Link
                      href={menu.pathname}
                      onClick={() => setIsOpen(false)}
                      className={`${
                        isActive
                          ? "text-primary-100"
                          : "text-secondary-100 hover:text-primary-100"
                      } text-body-2-medium flex items-center transition`}
                    >
                      {menu.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="mt-6 flex flex-col space-y-6 divide-black/10 lg:mt-0 lg:flex-row lg:items-center lg:space-y-0 lg:divide-x">
            <li className="lg:px-14">
              <Link
                href="/my-favorites"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname.startsWith("/my-favorites")
                    ? "text-primary-100"
                    : "text-secondary-100 hover:text-primary-100"
                } text-body-2-medium flex items-center space-x-1 transition`}
              >
                <Heart style={{ height: "20px" }} />
                <span>My Favorites</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-10">
          <div>
            <div className="hidden lg:block">
              <Link
                href="/my-cart"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname.startsWith("/my-cart")
                    ? "text-primary-100"
                    : "text-secondary-100 hover:text-primary-100"
                } text-body-2-medium flex items-center space-x-1 transition`}
              >
                <Buy style={{ height: "20px" }} />
                <span>My Cart</span>
              </Link>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center h-10 w-10">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            ) : userData ? (
              <div className="relative lg:block hidden">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isProfileOpen ? "true" : "false"}
                    aria-haspopup="true"
                    onClick={handleProfileDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userData?.profilePhoto}
                      alt="User profile"
                    />
                  </button>
                </div>

                {isProfileOpen && (
                  <div
                    className="absolute right-2 z-50 mt-2 w-32 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <p
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      {userData?.userName}
                    </p>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={logOutUser}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname.startsWith("/signup")
                    ? "border-primary-100 bg-primary-100 text-white"
                    : "border-secondary-100 bg-transparent text-secondary-100 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
                } text-body-2-medium mt-6 rounded-[32px] border px-6 py-[10px] text-center transition duration-300 lg:mt-0`}
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
