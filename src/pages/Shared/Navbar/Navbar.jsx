import Container from "@/components/Container/Container";
import NavbarMenu from "@/components/NavbarMenu/NavbarMenu";
import Searchbar from "@/components/Searchbar/Searchbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleToggle = () => {
    setToggleDropDown((isOpen) => !isOpen);
  };

  const closeToggle = () => {
    setToggleDropDown(false);
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">MedCare</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavbarMenu label={'Home'} address={'/'}/>
          <NavbarMenu label={'About'}
          address={'/about'}/>
          <NavbarMenu label={'Service'}
          address={'/service'}/>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Searchbar />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={handleToggle}
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          {toggleDropDown && (
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border z-50"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
