import React from 'react';
import DashBoardMenu from './DashBoardMenu';
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GiArchiveRegister } from 'react-icons/gi';


const OrganizerMenu = () => {
  return (
    <>
      <DashBoardMenu
        icon={FaHouseMedicalFlag}
        label={"Manage Camps"}
        address={"manage-camps"}
      />
      <DashBoardMenu
        icon={GiArchiveRegister}
        label={"Manage Registered"}
        address={"manage-registered"}
      />
    </>
  );
};

export default OrganizerMenu;