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
import ResetPasswordConfirm from "../components/Dashboard/Profile/ResetPasswordConfirm";
import ResendActivation from "../components/Dashboard/Profile/ResendActivation";
import ProductDetails from "../pages/Product/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Order/Orders";
import PaymentSuccess from './../pages/Payment/PaymentSuccess';
import AddProduct from "../pages/AddProduct/AddProduct";
import AdminProductList from "../pages/AdminProductList/AdminProductList";
import EditProduct from "../components/AdminProducts/EditProduct";
import AddCategories from "../pages/AddCategory.jsx/AddCategories";
import CategoryEdit from "../components/Categories/CategoryEdit";
import CategoryList from "../pages/AdminCategories/CategoryList";
import UserList from "../pages/UserList/UserList";
import ReviewList from "../pages/Reviews/ReviewList";


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
         path: "shop/:productId",
         element: <ProductDetails></ProductDetails>
      },
      {
        path: "activate/:uid/:token",
        element: <ActivateAccount></ActivateAccount>
      },
      {
        path: "password/reset/confirm/:uid/:token",
        element: <ResetPasswordConfirm></ResetPasswordConfirm>
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
    path: "resend-activation",
    element: <ResendActivation></ResendActivation>
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
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "orders",
          element: <Orders/>
        },
        {
          path: "payment/success/",
          element: <PaymentSuccess />
        },
        {
          path: "products/add",
          element: <AddProduct />
        },
        {
          path: "products",
          element: <AdminProductList />
        },
        {
          path: "products/edit/:productId/",
          element: <EditProduct />
        },
        {
          path: "categories/add",
          element: <AddCategories />
        },
        {
          path: "categories/edit/:categoryId",
          element: <CategoryEdit />
        },
        {
          path: "categories",
          element: <CategoryList />
        },
        {
          path: "users",
          element: <UserList />
        },
        {
          path: "reviews",
          element: <ReviewList />
        },
      ]
    },
  
]);
