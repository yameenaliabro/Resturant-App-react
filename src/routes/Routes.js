import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../components/common/layout/Layout";
import NonRequireAuth from "../components/pages/auth/NonRequireAuth";
import RequireAuth from "../components/pages/auth/RequireAuth";
import SignIn from "../components/pages/auth/signin/SignIn";
import SignUp from "../components/pages/auth/signup/SignUp";
import Cart from "../components/pages/cart/Cart";
import Checkout from "../components/pages/checkout/Checkout";
import Home from "../components/pages/home/Home";
import Historysend from "../components/pages/status/Historysend";
import AdminRoute from "../Admin/AdminRoute/AdminRoute"
import AdminHeader from "../Admin/AdmiCommanpage/adminheaders/AdminHeader";
import AdminCheckStatus from "../Admin/AdmiCommanpage/adminstatus/adminsatus";
import AdminAdd from "../Admin/AdmiCommanpage/AdminAddImage/AdminAddProduct"
import AdminUpdateProduct from "../Admin/AdmiCommanpage/AdminUpdateProduct/AdminUpdateProduct";
const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout children={<Outlet />} />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/signin",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            <NonRequireAuth>
              <SignIn />
            </NonRequireAuth>
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            <NonRequireAuth>
              <SignUp />
            </NonRequireAuth>
          ),
        },
      ],
    },
    {
      path: "/cart",
      element: <Layout children={<Outlet />} />,
      children: [{ index: true, element: <Cart /> }],
    },
    {
      path: "/history",
      element: <Layout children={<Outlet />} />,
      children: [{ index: true, element: <Historysend /> }],
    },
    {
      path: "/admin",
      children: [{ index: true, element: 
        <RequireAuth>
          <AdminRoute />
      </RequireAuth>
      }],
    },
    {
      path: "/add/product",
      element: <AdminHeader children={<Outlet />} />,
      children: [{ index: true, element: <AdminAdd/> }],
    },
    {
      path: "/check/status",
      element: <AdminHeader children={<Outlet />} />,
      children: [{ index: true, element: <AdminCheckStatus/> }],
    },
    {
      path: "/add/product/admin/update/Product/:id",
      element: <AdminHeader children={<Outlet />} />,
      children: [{ index: true, element: <AdminUpdateProduct/> }],
    },
    {
      path: "/checkout",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          ),
        },
      ],
    },
  ];
  return useRoutes(routes);
};
export default Routes;
