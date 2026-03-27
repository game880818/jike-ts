import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login"
import Layout from "../pages/Layout";
import AuthRoute from '@/components/AuthRoute'

import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

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
        element: <Home />,
      },
      {
        path: '/article',
        element: <Article />
      },
      {
        path: '/publish',
        element: <Publish />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router