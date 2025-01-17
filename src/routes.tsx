import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/pages/_layouts/app";
import { Account } from "@/pages/app/account";
import { Profile } from "@/pages/app/profile";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignIn } from "@/pages/auth/sign-in";

import { NotFound } from "@/pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Account /> },
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
