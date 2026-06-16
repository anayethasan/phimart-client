import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import Product from './../pages/Product/Product';
import Shop from "../pages/Shop/Shop";
import LoginPage from "../pages/Login/LoginPage";
import Register from './../pages/Register/Register';
import Dashboard from './../pages/Dashboard/Dashboard';
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../pages/Register/ActivateAccount";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
      element: <MainLayouts />,
    errorElement: <ErrorPage />,
      children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "product",
        element: <Product></Product>
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "activate/:uid/:token",
        element: <ActivateAccount></ActivateAccount>
      },
    ]
  },
  {
    path:"login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "dashboard",
    element: <PrivateRoute> <DashboardLayout/> </PrivateRoute>,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: "profile",
          element: <Profile />
        },
      ]
  },
  
]);
