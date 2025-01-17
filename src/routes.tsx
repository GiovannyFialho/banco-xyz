import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/pages/_layouts/app";
import { Balance } from "@/pages/app/balance";
import { Profile } from "@/pages/app/profile";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignIn } from "@/pages/auth/sign-in";

import { NotFound } from "@/pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Balance /> },
      { path: "/profile", element: <Profile /> }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
