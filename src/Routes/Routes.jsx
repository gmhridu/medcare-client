import Main from "@/Layouts/Main";
import SignIn from "@/pages/Authentication/SignIn/SignIn";
import Signup from "@/pages/Authentication/Signup/Signup";
import Home from "@/pages/Home/Home/Home"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home/>, 
      }
    ],
  },
  {
    path: 'signup',
    element: <Signup/>,
  },
  {
    path: 'signin', 
    element: <SignIn/>,
  }
])

export default router;