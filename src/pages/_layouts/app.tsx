import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <header>
        <h1>Hello world</h1>
      </header>

      <div className="flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
