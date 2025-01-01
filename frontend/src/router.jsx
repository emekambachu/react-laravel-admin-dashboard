import {createBrowserRouter} from "react-router-dom";

import {Login} from "./pages/Login.jsx";
import {Signup} from "./pages/Signup.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {Users} from "./pages/Users.jsx";
import {NotFound} from "./pages/NotFound.jsx";

import {DefaultLayout} from "./layouts/DefaultLayout.jsx";
import {GuestLayout} from "./layouts/GuestLayout.jsx";

const router = createBrowserRouter([

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
    ]
  },

  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },

  // {
  //   path: '/login',
  //   element: <Login />
  // },
  //
  // {
  //   path: '/signup',
  //   element: <Signup />
  // },
  //
  // {
  //   path: '/login',
  //   element: <Users />
  // },

  {
    path: '*',
    element: <NotFound />
  }

]);

export default router;
