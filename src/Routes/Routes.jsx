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
import PrivateRoute from "./PrivateRoute";
import ParticipantRoutes from "./ParticipantRoutes";
import OrganizerRoute from "./OrganizerRoute";

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
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <AddCamp />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <ParticipantRoutes>
              <PaymentHistory />
            </ParticipantRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "registered-camp",
        element: (
          <PrivateRoute>
            <ParticipantRoutes>
              <RegisteredCamps />
            </ParticipantRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageCamps />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-registered",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageRegisteredCamps />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;