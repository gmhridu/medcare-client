import React from 'react';
import Sidebar from './Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <>
      <div className="relative min-h-screen md:flex">
        {/* sidebar */}
        <Sidebar />

        {/* Outlet --> Dynamic content */}
        <div className="flex-1 md:ml-64">
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;