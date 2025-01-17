import { createBrowserRouter } from "react-router";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignIn } from "@/pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }]
  }
]);
