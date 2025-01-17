import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/pages/_layouts/app";
import { Balance } from "@/pages/app/balance";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignIn } from "@/pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Balance /> }]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }]
  }
]);
