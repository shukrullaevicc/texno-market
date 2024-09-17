import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import { Loading } from "../utils";

const Home = lazy(() => import('../routes/home/Home'));
const Cart = lazy(() => import('../routes/Cart/Cart'));
const Favorite = lazy(() => import('../routes/Favorite/Favorite'));
const SinglePage = lazy(() => import('../routes/single-page/SinglePage'));

const Dashboard = lazy(() => import('../routes/dashboard/Dashboard'));
const Profile = lazy(() => import('../routes/dashboard/profile/Profile'));
const Settings = lazy(() => import('../routes/dashboard/settings/Settings'));
const Users = lazy(() => import('../routes/dashboard/users/Users'));
const Products = lazy(() => import('../routes/dashboard/products/Products'));

const Auth = lazy(() => import('../routes/auth/Auth'));
const Login = lazy(() => import('../routes/auth/login/Login'));
const Register = lazy(() => import('../routes/auth/register/Register'));

const NotFound = lazy(() => import('../routes/not-found/NotFound'));

const Private = lazy(() => import('../routes/private/Private'));

const RouteController = () => {
  return useRoutes([
    {
      path: '',
      element: <Suspense fallback={<Loading />}><Home /></Suspense>,
    },

    {
      path: 'single-product/:id',
      element: <Suspense fallback={<Loading />}><SinglePage /></Suspense>,
    },

    {
      path: 'cart',
      element: <Suspense fallback={<Loading />}><Cart /></Suspense>
    },

    {
      path: 'favorite',
      element: <Suspense fallback={<Loading />}><Favorite /></Suspense>
    },

    {
      path: 'auth',
      element: <Suspense fallback={<Loading />}><Auth /></Suspense>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<Loading />}><Login /></Suspense>
        },
        {
          path: 'register',
          element: <Suspense fallback={<Loading />}><Register /></Suspense>
        }
      ]  
    },

    {
      path: "dashboard",
      element: <Suspense fallback={<Loading />}><Private /></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
          children: [
            {
              path: "",
              element: <Suspense fallback={<Loading />}><Products /></Suspense>
            },
            {
              path: "users",
              element: <Suspense fallback={<Loading />}><Users /></Suspense>
            },
            {
              path: "settings",
              element: <Suspense fallback={<Loading />}><Settings /></Suspense>
            },
            {
              path: "profile",
              element: <Suspense fallback={<Loading />}><Profile /></Suspense>
            }
          ]
        }
      ]
    },

    {
      path: '*',
      element: <Suspense fallback={<Loading />}><NotFound /></Suspense>
    }
  ])
}

export default RouteController