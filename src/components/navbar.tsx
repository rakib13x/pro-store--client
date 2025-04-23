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
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { cartItems } = useAppSelector((state) => state.cartSlice);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  console.log("number of cart items", count);
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
    try {
      await logout();

      localStorage.removeItem(`cart_${userData?.userId}`); //

      // Clear user state
      useLogOut?.setIsLoading(true);
      useLogOut?.setUser(null);

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getDashboardLink = (role: string) => {
    if (role === "SUPERADMIN") {
      return "/admin/dashboard";
    }
    return `/${role.toLowerCase()}/dashboard`;
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
              className="relative rounded-sm border border-secondary-100 p-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
            >
              <Buy style={{ height: "21px" }} />
              <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                5
              </span>
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
              {/* <Link
                href="/my-cart"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname.startsWith("/my-cart")
                    ? "text-primary-100"
                    : "text-secondary-100 hover:text-primary-100"
                } text-body-2-medium flex items-center space-x-1 transition`}
              >
                <Buy style={{ height: "20px" }} />

                <span
                  className="absolute top-[30%] right-[11.5%] -mt-1 -mr-1  
                     bg-red-600 w-5 h-5 rounded-full 
                     flex items-center justify-center 
                     text-xs text-white font-mono"
                >
                  {count}
                </span>
              </Link> */}
              <Link href="/my-cart" onClick={() => setIsOpen(false)}>
                <button
                  className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Cart"
                >
                  <svg
                    className={`${
                      pathname.startsWith("/my-cart")
                        ? "text-primary-100"
                        : "text-black"
                    } h-6 w-6`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {count > 0 && (
                    <span
                      className="absolute top-0 right-0 mt-1 -mr-1  
                     bg-red-600 w-5 h-5 rounded-full 
                     flex items-center justify-center 
                     text-xs text-white font-mono"
                    >
                      {count}
                    </span>
                  )}
                </button>
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
                    <Link
                      href={getDashboardLink(userData?.role)}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      dashboard
                    </Link>
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
