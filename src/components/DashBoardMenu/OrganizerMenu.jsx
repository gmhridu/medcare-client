import React from 'react';
import DashBoardMenu from './DashBoardMenu';
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GiArchiveRegister } from 'react-icons/gi';
import { TbReportMedical } from 'react-icons/tb';


const OrganizerMenu = () => {
  return (
    <>
    <DashBoardMenu
        icon={TbReportMedical}
        label={"Add Camp"}
        address={"add-camp"}
      />
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