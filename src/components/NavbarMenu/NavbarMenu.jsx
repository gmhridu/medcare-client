import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarMenu = ({label, address}) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `btn btn-ghost btn-sm transition-colors duration-300 transform hover:bg-gray-300 rounded-full  hover:text-[#4CBDF8]  ${
          isActive ? "bg-[#4CBDF8] text-white" : ""
        }`
      }
    >
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default NavbarMenu;