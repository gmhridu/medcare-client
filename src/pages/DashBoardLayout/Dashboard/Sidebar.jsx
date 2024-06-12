import useAuth from '@/Hooks/useAuth';
import useRole from '@/Hooks/useRole';
import React, { useState } from 'react';
import logo from '/logo.png'
import { AiOutlineBars } from 'react-icons/ai';
import DashBoardMenu from '@/components/DashBoardMenu/DashBoardMenu';
import { BsGraphUp } from 'react-icons/bs';
import ParticipantMenu from '@/components/DashBoardMenu/ParticipantMenu';
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { Link, NavLink } from 'react-router-dom';
import OrganizerMenu from '@/components/DashBoardMenu/OrganizerMenu';


const Sidebar = () => {
  const { logOut, loading } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive((isOpen) => !isOpen);
  };


  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold w-full">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="150"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <DashBoardMenu
                label="Statistics"
                address="/dashboard"
                icon={BsGraphUp}
              />
              {role === "participant" && <ParticipantMenu />}
              {role === "organizer" && <OrganizerMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <DashBoardMenu
            label="Profile"
            address="/dashboard/profile"
            icon={FcSettings}
          />
          <NavLink to={"/"}>
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   transition-colors rounded-md duration-300 transform hover:text-[#4CBDF8]"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;