import { Landmark } from "lucide-react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
      <div className="relative hidden h-full flex-col justify-between bg-green-200 p-10 text-muted-foreground lg:flex">
        <div className="flex items-end gap-3 text-lg font-medium text-foreground">
          <Landmark className="h-20 w-20" />

          <span className="text-7xl font-bold">Banco XYZ</span>
        </div>

        <footer>
          <span className="text-sm font-medium text-green-950">
            Banco XYZ - {new Date().getFullYear()}
          </span>
        </footer>

        <div className="absolute inset-0 h-full w-full bg-[url(/images/cover-image.jpg)] bg-cover opacity-25"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
