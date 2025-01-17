import { Lock, Mail, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-5 text-3xl font-semibold tracking-tight">Bem-vindo de volta!</h1>

        <form className="flex flex-col gap-2">
          <div className="border-1 flex items-center gap-1 rounded-md border border-green-800 p-2">
            <Mail />
            <Input placeholder="username@teste.com" />
          </div>

          <div className="border-1 flex items-center gap-1 rounded-md border border-green-800 p-2">
            <Lock />
            <Input placeholder="******" />
          </div>

          <Button
            type="button"
            className="flex items-center gap-2 bg-green-950 text-lg font-bold hover:bg-green-700"
          >
            Entrar
            <MoveRight className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
