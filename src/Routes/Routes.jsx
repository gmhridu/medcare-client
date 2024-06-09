import Main from "@/Layouts/Main";
import AddCamp from "@/pages/DashBoardLayout/Participants/AddCamp/AddCamp";
import SignIn from "@/pages/Authentication/SignIn/SignIn";
import Signup from "@/pages/Authentication/Signup/Signup";
import CampDetails from "@/pages/CampDetails/CampDetails";
import Statistics from "@/pages/DashBoardLayout/Dashboard/Statistics";
import DashBoardLayout from "@/pages/DashBoardLayout/DashBoardLayout";
import ManageCamps from "@/pages/DashBoardLayout/OrganizerDashboard/ManageCamps";
import ManageRegisteredCamps from "@/pages/DashBoardLayout/OrganizerDashboard/ManageRegisteredCamps";
import PaymentHistory from "@/pages/DashBoardLayout/Participants/PaymentHistory";
import RegisteredCamps from "@/pages/DashBoardLayout/Participants/RegisteredCamps";
import Home from "@/pages/Home/Home/Home"
import OurCamps from "@/pages/OurCamps/OurCamps";
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/our-camps",
        element: <OurCamps />,
      },
      {
        path: "/camp/:id",
        element: <CampDetails />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "add-camp",
        element: <AddCamp />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "registered-camp",
        element: <RegisteredCamps />,
      },
      {
        path: "manage-camps",
        element: <ManageCamps />,
      },
      {
        path: "manage-registered",
        element: <ManageRegisteredCamps />,
      },
    ],
  },
]);

export default router;