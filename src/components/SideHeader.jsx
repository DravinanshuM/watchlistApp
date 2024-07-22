import {
  FaSearch,
  FaHome,
  FaList,
  FaCheckCircle,
  FaBars,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleFill } from "react-icons/ri";
import { IoSettingsSharp, IoClose } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideHeaderVisible, setIsSideHeaderVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFaBarsClick = () => {
    setIsSideHeaderVisible(!isSideHeaderVisible);
  };

  return (
    <>
      <div className="bg-transparent p-5 md:hidden">
        {isSideHeaderVisible ? (
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={handleFaBarsClick}
            title="Close sidebar"
          />
        ) : (
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={handleFaBarsClick}
            title="Open sidebar"
          />
        )}
      </div>
      <div
        className={`fixed md:relative inset-y-0 left-0 transform ${
          isSideHeaderVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out bg-slate-50 md:bg-transparent h-screen border-r-2 flex flex-col p-5 z-50`}
      >
        <div className="flex-grow">
          <div className="bg-slate-50 p-5 border-b-2 md:hidden flex justify-between items-center">
            {isSideHeaderVisible ? (
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={handleFaBarsClick}
                title="Close sidebar"
              />
            ) : (
              <FaBars
                className="text-2xl cursor-pointer"
                onClick={handleFaBarsClick}
                title="Open sidebar"
              />
            )}
          </div>
          <div className="font-extrabold mb-5 items-center text-center">
            <span className="text-red-600 hidden md:block md:text-3xl">
              Watchlists
            </span>
            <span className="text-red-600 text-3xl font-extrabold block md:hidden">
              W
            </span>
          </div>

          <div className="relative w-full mb-5 hidden md:block">
            <FaSearch className="absolute top-3.5 left-3 text-gray-500" />
            <input
              type="search"
              className="w-full border-2 border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
          </div>

          <nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full py-2 px-4 text-md rounded-md flex items-center mb-2 ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                }`
              }
            >
              <FaHome className="mr-2 text-xl" />
              <span className="hidden md:block">Home</span>
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `w-full py-2 px-4 text-md rounded-md flex items-center mb-2 ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                }`
              }
            >
              <FaList className="mr-2 text-xl" />
              <span className="hidden md:block">My Lists</span>
            </NavLink>
            <NavLink
              to="/watched"
              className={({ isActive }) =>
                `w-full py-2 px-4 text-md rounded-md flex items-center mb-2 ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                }`
              }
            >
              <FaCheckCircle className="mr-2 text-xl" />
              <span className="hidden md:block">Watched</span>
            </NavLink>
          </nav>
        </div>

        <div className="mt-auto w-full relative">
          <button
            className="w-full p-2 md:py-2 md:px-4 text-md rounded-md border-2 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-between"
            onClick={handleButtonClick}
          >
            <div className="flex items-center">
              <CgProfile className="mr-2 text-xl" />
              <span className="hidden md:block">GUEST</span>
            </div>
            <span className="hidden md:block text-xl">...</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <ul>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center">
                  <ImProfile className="mr-2 text-xl" title="Profile" />
                  <span className="hidden md:block">Profile</span>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center">
                  <IoSettingsSharp className="mr-2 text-xl" title="Settings" />
                  <span className="hidden md:block">Settings</span>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center">
                  <RiLogoutCircleFill className="mr-2 text-xl" title="Logout" />
                  <span className="hidden md:block">Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isSideHeaderVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={handleFaBarsClick}
        />
      )}
    </>
  );
};

export default SideHeader;
