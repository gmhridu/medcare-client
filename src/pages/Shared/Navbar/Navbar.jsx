import Container from "@/components/Container/Container";
import NavbarMenu from "@/components/NavbarMenu/NavbarMenu";
import Searchbar from "@/components/Searchbar/Searchbar";
import useAuth from "@/Hooks/useAuth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import profileImage from '@/assets/images/placeholder.jpg'
import toast from "react-hot-toast";

const Navbar = () => {
  const {user, logOut} = useAuth()
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleToggle = () => {
    setToggleDropDown((isOpen) => !isOpen);
  };

  const closeToggle = () => {
    setToggleDropDown(false);
  }

  const handleLogOut = () => {
    logOut()
    toast.success('Logout Successfully')
  closeToggle()
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          MedCare
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavbarMenu label={"Home"} address={"/"} />
          <NavbarMenu label={"About"} address={"/about"} />
          <NavbarMenu label={"Service"} address={"/service"} />
          <NavbarMenu label={"Add Camp"} address={"/add-camp"} />
          <NavbarMenu label={"Our Camps"} address={"/our-camps"} />
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
            <div
              className="hidden md:block  w-10 h-10"
              title={user?.displayName}
            >
              <img
                className="rounded-full w-full h-full object-cover"
                referrerPolicy="no-referrer"
                alt="Profile"
                src={user?.photoURL ? user?.photoURL : profileImage}
              />
            </div>
          </div>
          {toggleDropDown && (
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 border z-50 space-y-2"
            >
              <NavbarMenu label={"Home"} address={"/"} />
              {user ? (
                <>
                  <NavbarMenu label={"Dashboard"} address={"/dashboard"} />
                  <div className="btn btn-ghost btn-sm transition-colors duration-300 transform hover:bg-gray-300 rounded-full  hover:text-sky-400">
                    <button onClick={handleLogOut}>Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <NavbarMenu label={"Sign In"} address={"/signin"} />
                  <NavbarMenu label={"Sign Up"} address={"/signup"} />
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
