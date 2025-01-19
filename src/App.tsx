import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { queryClient } from "@/lib/react-query";
import { router } from "@/routes";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserContextProvider } from "@/contexts/user-context";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <TooltipProvider>
          <Toaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
