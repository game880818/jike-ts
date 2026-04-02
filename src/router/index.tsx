import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "../pages/Login"
import Layout from "../pages/Layout";
import AuthRoute from '@/components/AuthRoute'

// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";

const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Home'))

const router = createBrowserRouter([
  {
    // 親ルート
    path: '/',
    element:
      <AuthRoute>
        <Layout />
      </AuthRoute>,
    // 子ルート
    children: [
      {
        index: true,
        element: <Suspense fallback={'ローディング'}><Home /></Suspense>,
      },
      {
        path: '/article',
        element: <Suspense fallback={'ローディング'}><Article /></Suspense>,
      },
      {
        path: '/publish',
        element: <Suspense fallback={'ローディング'}><Publish /></Suspense>,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router