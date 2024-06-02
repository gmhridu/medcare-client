import Main from "@/Layouts/Main";
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
])

export default router;