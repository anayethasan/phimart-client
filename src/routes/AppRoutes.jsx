import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import Product from './../pages/Product/Product';
import Shop from "../pages/Shop/Shop";


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
    ]
  },
]);
