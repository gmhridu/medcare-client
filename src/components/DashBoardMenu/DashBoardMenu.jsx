import React from 'react';
import { NavLink } from 'react-router-dom';

const DashBoardMenu = ({label, address, icon: Icon}) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   transition-colors rounded-md duration-300 transform hover:text-[#4CBDF8]  ${
          isActive ? "bg-[#4CBDF8] text-white" : ""
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default DashBoardMenu;