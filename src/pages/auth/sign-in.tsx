import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Lock, Mail, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { signIn } from "@/api/sign-in";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O campo e-mail é obrigatório" })
    .email({ message: "Você deve preencher um e-mail válido" }),
  password: z.string().min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  });

  async function handleSignIn(data: SignInFormData) {
    const { email, password } = data;

    try {
      const { token, user } = await authenticate({ email, password });

      toast({
        variant: "default",
        title: "Sucesso",
        description: `Login efetuado com sucesso! Bem-vindo, ${user.name}`,
        className: "bg-green-300 text-gray-100"
      });

      // Definindo um cookie com 24 horas de expiração
      Cookies.set("bankXYZ@user-token", token, { expires: 1 });
      Cookies.set("bankXYZ@user-id", user.id.toString(), { expires: 1 });
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        toast({
          title: "Ops!",
          description: "Credenciais inválidas, tente login e senha válidos",
          className: "bg-red-500 text-gray-100"
        });
      } else {
        toast({
          title: "Ops!",
          description: "Algo deu errado. Por favor, tente novamente mais tarde",
          className: "bg-red-500 text-gray-100"
        });
      }
    }
  }

  return (
    <div className="flex w-full max-w-80 flex-col items-center justify-center">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">Bem-vindo de volta!</h1>

      <form onSubmit={handleSubmit(handleSignIn)} className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="border-1 flex items-center gap-1 rounded-md border border-green-800 p-2">
            <Mail />
            <Input placeholder="username@teste.com" {...register("email")} />
          </div>

          {errors.email?.message && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="border-1 flex items-center gap-1 rounded-md border border-green-800 p-2">
            <Lock />
            <Input type="password" placeholder="********" {...register("password")} />
          </div>

          {errors.password?.message && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className="flex h-auto items-center gap-2 bg-green-950 py-2 text-lg font-bold hover:bg-green-700"
          disabled={isSubmitting}
        >
          Entrar
          <MoveRight className="h-6 w-6" />
        </Button>
      </form>
    </div>
  );
}
