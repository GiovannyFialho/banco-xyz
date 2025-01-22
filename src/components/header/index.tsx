import { useMutation } from "@tanstack/react-query";
import { ChevronDown, Landmark, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { signOut } from "@/api/sign-out";

import { useUser } from "@/contexts/user-context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const { user, clearUserData } = useUser();

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    }
  });

  return (
    <header
      data-testid="header-component"
      className="flex w-full items-center justify-between bg-green-200 px-4 py-8"
    >
      <Link to="/" className="hidden items-center gap-2 lg:flex">
        <Landmark size={20} />

        <span data-testid="bank-name" className="text-lg font-bold">
          Banco XYZ
        </span>
      </Link>

      <nav>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2" data-testid="trigger-menu">
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <ChevronDown size={20} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" className="ml-4 w-72 lg:ml-0 lg:w-40">
            <DropdownMenuLabel className="text-base">Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-base">
              <Link to="/profile" data-testid="trigger-profile">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer text-base">
              <Link to="/" data-testid="trigger-account">
                Conta
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer text-base">
              <button
                type="button"
                disabled={isSigningOut}
                className="w-full"
                data-testid="trigger-signOut"
                onClick={() => {
                  clearUserData();
                  signOutFn();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
