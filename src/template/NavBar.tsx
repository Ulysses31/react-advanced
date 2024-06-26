/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CircleStackIcon,
  LockOpenIcon,
  MoonIcon,
  NewspaperIcon,
  SunIcon,
  SwatchIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const navigation = [
  {
    id: 1,
    name: "Dashboard",
    href: "/",
    current: false,
    icon: (item: any, w: number = 6, h: number = 6) => (
      <NewspaperIcon
        className={classNames(
          item.current
            ? "text-white"
            : "text-gray-400 group-hover:text-gray-300",
          `mr-2 h-${h} w-${w}`
        )}
        aria-hidden="true"
      />
    ),
  },
  {
    id: 2,
    name: "Categories",
    href: "/categories",
    current: false,
    icon: (item: any, w: number = 6, h: number = 6) => (
      <SwatchIcon
        className={classNames(
          item.current
            ? "text-white"
            : "text-gray-400 group-hover:text-gray-300",
          `mr-2 h-${h} w-${w}`
        )}
        aria-hidden="true"
      />
    ),
  },
  {
    id: 3,
    name: "Records",
    href: "/records",
    current: false,
    icon: (item: any, w: number = 6, h: number = 6) => (
      <CircleStackIcon
        className={classNames(
          item.current
            ? "text-white"
            : "text-gray-400 group-hover:text-gray-300",
          `mr-2 h-${h} w-${w}`
        )}
        aria-hidden="true"
      />
    ),
  },
];

function NavBar() {
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["dark-mode"]);
  const [isDarkMode, setIsDarkMode] = useState(cookies["dark-mode"]);
  const {
    loginWithRedirect,
    logout,
    user: authUser,
    isAuthenticated,
  } = useAuth0();

  const user = {
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const userNavigation = [
    {
      name: "Profile",
      href: "/user/profile",
      icon: <UserGroupIcon className="w-6 h-6" aria-hidden="true" />,
    },
    {
      name: "Settings",
      href: "#",
      icon: <WrenchScrewdriverIcon className="w-6 h-6" aria-hidden="true" />,
    },
    {
      name: "Sign out",
      href: "#",
      icon: <LockOpenIcon className="w-6 h-6" aria-hidden="true" />,
    },
  ];

  const [menuItemCurr, setMenuItemCurr] = useState(navigation);

  const handleDarkMode = () => {
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
    setCookie("dark-mode", !isDarkMode, {
      expires: new Date(new Date().setMinutes(new Date().getMinutes() + 5)),
    });
  };

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");

    // Set current active menu item
    let idx = navigation.findIndex((item) => {
      return item.href === location.pathname;
    });

    if (idx === -1) {
      idx = navigation.findIndex((item) => {
        return item.href === `/${location.pathname.split("/")[1]}`;
      });
    }

    setMenuItemCurr(
      menuItemCurr.map((item) => {
        return {
          ...item,
          current: item.id === idx + 1,
        };
      })
    );
    return () => {};
  }, [isDarkMode]);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="KeePass"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {menuItemCurr.map((item, index: number) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-0"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            setMenuItemCurr(
                              menuItemCurr.map((item) => {
                                return {
                                  ...item,
                                  current: item.id === index + 1 ? true : false,
                                };
                              })
                            );
                          }}
                        >
                          {item.icon(item)}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="space-x-2 ml-4 flex items-center md:ml-6">
                    {isDarkMode && (
                      <MoonIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    )}

                    {!isDarkMode && (
                      <SunIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    )}

                    <div className="rounded">
                      <form>
                        <label htmlFor="darkMode">
                          <input
                            id="darkMode"
                            name="darkMode"
                            type="checkbox"
                            value={isDarkMode}
                            onChange={handleDarkMode}
                            checked={isDarkMode}
                          />
                        </label>
                      </form>
                    </div>

                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Login */}
                    {!isAuthenticated && (
                      <button
                        type="button"
                        className="flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => loginWithRedirect()}
                      >
                        <UsersIcon
                          className="h-6 w-6 mr-2"
                          aria-hidden="true"
                        />
                        Login
                      </button>
                    )}

                    {/* Profile dropdown */}
                    {isAuthenticated && (
                      <Menu as="div" className="relative ml-0">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={authUser?.picture}
                              alt="logged in user avatar"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <div className="flex justify-items-center">
                                    <Link
                                      to={item.href}
                                      className={classNames(
                                        active ? "dark:hover:bg-gray-600" : "",
                                        "flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600"
                                      )}
                                      onClick={() => {
                                        // console.log("item", item);
                                        if (item.name === "Sign out") {
                                          logout({
                                            logoutParams: {
                                              returnTo: window.location.origin,
                                            },
                                          });
                                        }
                                      }}
                                    >
                                      <span className="mr-2">{item.icon}</span>
                                      {item.name}
                                    </Link>
                                  </div>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {menuItemCurr.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-base font-medium flex items-center space-x-0"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.icon(item)}
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>

              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5 border-b border-gray-700 pb-3">
                  {/* Login */}
                  {!isAuthenticated && (
                    <button
                      type="button"
                      className="flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => loginWithRedirect()}
                    >
                      <UsersIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                      Login
                    </button>
                  )}

                  {isAuthenticated && (
                    <div className="flex place-items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={authUser?.picture || user.imageUrl}
                          alt="user avatar"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium leading-none text-white">
                          {authUser?.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {authUser?.email}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex place-items-center relative ml-auto flex-shrink-0 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    {isDarkMode && (
                      <MoonIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    )}

                    {!isDarkMode && (
                      <SunIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    )}

                    <div className="rounded ml-2">
                      <form>
                        <label htmlFor="darkMode">
                          <input
                            id="darkMode"
                            name="darkMode"
                            type="checkbox"
                            value={isDarkMode}
                            onChange={handleDarkMode}
                            checked={isDarkMode}
                          />
                        </label>
                      </form>
                    </div>

                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={() => {
                          // console.log("item", item);
                          if (item.name === "Sign out") {
                            logout({
                              logoutParams: {
                                returnTo: window.location.origin,
                              },
                            });
                          }
                        }}
                        className="flex rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* {isAuthenticated && (
        <code className="text-sm dark:text-gray-400 block shadow-md mt-2 mr-6 ml-6 p-3 overflow-auto">
          <pre>{JSON.stringify(authUser, null, 2)}</pre>
        </code>
      )} */}
    </div>
  );
}

export default NavBar;
