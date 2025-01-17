import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Landmark, LoaderCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

import { signOut } from "@/api/sign-out";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    }
  });

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
      <header className="flex w-full items-center justify-between bg-green-200 px-4 py-8">
        <Link to="/" className="hidden items-center gap-2 lg:flex">
          <Landmark size={20} />

          <span className="text-lg font-bold">Banco XYZ</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="text-lg font-bold">Giovanny Fialho</h2>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" className="w-40">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/">Saldo</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/profile">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <button
                type="button"
                disabled={isSigningOut}
                className="w-full"
                onClick={() => signOutFn()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
