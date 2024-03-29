import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-[500px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
          }
        >
          Bản tin sáng
        </NavLink>
        <NavLink
          to="/ban-tin-chieu"
          className={({ isActive }) =>
            isActive
              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
          }
        >
          Bản tin chiều
        </NavLink>
        <NavLink
          to="/ban-tin-tuan"
          className={({ isActive }) =>
            isActive
              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
          }
        >
          Bản tin tuần
        </NavLink>
      </div>
      <div className="flex items-center justify-around w-[500px] mt-[30px]">
        <NavLink
          to="/phan-tich-ky-thuat"
          className={({ isActive }) =>
            isActive
              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
          }
        >
          Phân tích kỹ thuật
        </NavLink>
        <NavLink
          to="/phan-tich-ky-thuat-tu-dong"
          className={({ isActive }) =>
            isActive
              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium border border-solid border-collapse border-[#1E5D8B]"
          }
        >
          Phân tích kỹ thuật tự động
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
