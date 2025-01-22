import Cookies from "js-cookie";
import { Landmark } from "lucide-react";
import { Link } from "react-router";

export function NotFound() {
  const correctLink = Cookies.get("bankXYZ@user-auth") ? "/" : "/sign-in";

  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-3 px-3"
      data-testid="unknown-component"
    >
      <Landmark size={240} />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl font-bold">Ops! Página não encontrada</h1>
        <p className="text-center text-lg font-light">
          Parece que você tentou acessar uma página que não existe ou foi removida.
        </p>

        <Link
          to={correctLink}
          data-testid="trigger-back"
          className="cursor-pointer rounded-sm border-2 border-green-950 px-3 py-1 transition-all duration-300 hover:bg-green-900 hover:text-gray-100"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
