import Main from "@/Layouts/Main";
import AddCamp from "@/pages/AddCamp/AddCamp";
import SignIn from "@/pages/Authentication/SignIn/SignIn";
import Signup from "@/pages/Authentication/Signup/Signup";
import CampDetails from "@/pages/CampDetails/CampDetails";
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
        path: "/add-camp",
        element: <AddCamp />,
      },
      {
        path: "/our-camps",
        element: <OurCamps/>,
      },
      {
        path: "/camp/:id",
        element: <CampDetails/>,
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
]);

export default router;