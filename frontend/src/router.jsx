import {createBrowserRouter} from "react-router-dom";
import {Login} from "./pages/Login.jsx";
import {Signup} from "./pages/Signup.jsx";
import {Users} from "./pages/Users.jsx";
import {NotFound} from "./pages/NotFound.jsx";

const router = createBrowserRouter([

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Users />
  },
  {
    path: '*',
    element: <NotFound />
  }

]);

export default router;
