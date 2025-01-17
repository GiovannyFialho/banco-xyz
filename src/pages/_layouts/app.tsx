import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { Header } from "@/components/header";

export function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = Cookies.get("bankXYZ@user-token");

    if (!userToken) {
      navigate("/sign-in", { replace: true });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-max w-max animate-spin">
          <LoaderCircle size={50} className="text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
