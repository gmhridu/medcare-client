import React from 'react';
import DashBoardMenu from './DashBoardMenu';
import { LuBadgeDollarSign } from "react-icons/lu";
import { GiArchiveRegister } from 'react-icons/gi';
import { TbReportMedical } from "react-icons/tb";


const ParticipantMenu = () => {
  return (
    <>
      <DashBoardMenu
        icon={LuBadgeDollarSign}
        label={"Payment History"}
        address={"payment-history"}
      />
      <DashBoardMenu
        icon={GiArchiveRegister}
        label={"Registered Camps"}
        address={"registered-camp"}
      />
    </>
  );
};

export default ParticipantMenu;