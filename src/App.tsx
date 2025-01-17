import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { queryClient } from "@/lib/react-query";
import { router } from "@/routes";

import { Toaster } from "@/components/ui/toaster";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
