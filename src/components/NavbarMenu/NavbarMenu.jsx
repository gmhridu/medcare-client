import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarMenu = ({label, address}) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `btn btn-ghost btn-sm transition-colors duration-300 transform hover:bg-gray-300 rounded-full  hover:text-sky-400  ${
          isActive ? "bg-sky-400 text-white" : ""
        }`
      }
    >
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default NavbarMenu;