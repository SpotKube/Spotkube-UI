import React, { lazy } from "react";

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  // { name: "Home", href: "/" },
  // { name: "Contact Us", href: "/contact-us" },
];

/**
 * Navigation Bar Component for the Landing page
 * @returns
 */
const NavigationBar = (props) => {
  const activeNav = props.activeNav;
  return (
    <>
      {/* <div className="relative bg-white overflow-hidden"> */}
      <div className=" mx-auto">
        <div className="relative z-10 pb-4 bg-white sm:pb-8 md:pb-8  lg:w-full lg:pb-8 xl:pb-8 ">
          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 "
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                      {/* <span className="sr-only">Workflow</span> */}
                      <img
                        className="h-16 w-auto sm:h-24"
                        src={process.env.PUBLIC_URL + "/images/LOGO_WHITE.png"}
                      />
                    </Link>
                    <h2 className="mx-4 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
                     Stated Choice Survey Creator
                    </h2>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                {/* <div className="hidden md:block md:ml-2 md:pr-4 md:space-x-6 log:space-x-8 lg:justify-end">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-medium ${
                        activeNav == item.name
                          ? "text-indigo-600"
                          : "text-gray-700"
                      } hover:text-gray-900`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/swagger"
                    className={`font-medium ${
                      activeNav == "Log in"
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }  hover:text-gray-900`}
                  >
                    Log in
                  </Link>
                </div> */}
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center 
                        hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          activeNav == item.name
                            ? "text-indigo-600"
                            : "text-gray-700"
                        } hover:text-gray-900 hover:bg-gray-50`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/swagger"
                    className={`block w-full px-5 py-3 text-center font-medium ${
                      activeNav == "Log in"
                        ? "text-indigo-600"
                        : "text-gray-700"
                    } bg-gray-50 hover:bg-gray-100`}
                  >
                    Log in
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default NavigationBar;
