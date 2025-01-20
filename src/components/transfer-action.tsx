import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, CircleDollarSign, DollarSign, FileUser, Info, Plus } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { transfer } from "@/api/transfer";
import { useUser } from "@/contexts/user-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { useMediaQuery } from "@/hooks/use-media-query";

import { DatePicker } from "@/components/date-picker";
import { SelectCurrency } from "@/components/select-currency";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TransferAction() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="h-auto w-max bg-green-400 px-6 py-3 text-lg font-bold text-green-950 hover:bg-green-500">
            Nova transferência
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="mb-3 border-b border-dashed pb-3">
            <DialogTitle className="text-5xl font-bold text-green-600">
              Nova transferência
            </DialogTitle>

            <DialogDescription className="text-lg text-gray-800">
              Preencha os campos abaixo para realizar sua transferência
            </DialogDescription>
          </DialogHeader>

          <TransferForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="h-auto w-full bg-green-400 px-6 py-3 text-lg font-bold text-green-950 hover:bg-green-500">
          Nova transferência
          <Plus />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="mb-3 border-b border-dashed pb-3 text-left">
          <DrawerTitle className="text-4xl font-bold text-green-600">
            Nova transferência
          </DrawerTitle>
          <DrawerDescription className="text-lg text-gray-800">
            Preencha os campos abaixo para realizar sua transferência
          </DrawerDescription>
        </DrawerHeader>

        <TransferForm className="px-4" onClose={() => setOpen(false)} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const transferFormSchema = z.object({
  value: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" })
    .transform((val) => {
      const num = Number(val);

      if (isNaN(num)) {
        throw new Error("O valor não é um número válido");
      }

      return num;
    }),
  currency: z.enum(["USD", "EUR", "BRL"], { message: "Campo obrigatório" }),
  payeerDocument: z
    .string()
    .min(11, { message: "O documento deve conter pelo menos 11 números" })
    .max(11, { message: "O ducumento só pode ter 11 números" })
    .regex(/^\d+$/, { message: "O documento deve conter apenas números" }),
  transferDate: z.date({ message: "Campo obrigatório" })
});

type TransferFormData = z.infer<typeof transferFormSchema>;

interface TransferFormProps extends ComponentProps<"form"> {
  onClose: () => void;
}

function TransferForm({ className, onClose }: TransferFormProps) {
  const { token } = useUser();
  const { toast } = useToast();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferFormSchema)
  });

  const { mutateAsync: transferFn } = useMutation({
    mutationFn: transfer
  });

  async function handleSendTransfer(data: TransferFormData) {
    const { value, currency, payeerDocument, transferDate } = data;

    try {
      const response = await transferFn({ token, value, currency, payeerDocument, transferDate });

      if (response.status === "success") {
        toast({
          variant: "default",
          title: "Sucesso",
          description: "transferência efetuada com sucesso",
          className: "bg-green-600 text-gray-100 border-0",
          duration: 3000
        });

        onClose();
      }
    } catch (error) {
      console.error("Erro no login:", error);

      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao efetuar transferência. Tente novamente mais tarde.",
        className: "bg-red-600 text-gray-100 border-0",
        duration: 3000
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendTransfer)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center rounded-sm border border-green-400 px-3 pl-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex h-9 w-11 items-center justify-center">
                <DollarSign size={20} />

                <Info size={10} className="absolute right-0 top-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Preencha o valor que você deseja transferir</p>
            </TooltipContent>
          </Tooltip>

          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <NumericFormat
                value={field.value}
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                onValueChange={(values) => field.onChange(values.value)}
              />
            )}
          />
        </div>

        {errors.value?.message && (
          <span className="text-sm text-red-500">{errors.value?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center rounded-sm border border-green-400">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex h-9 w-11 items-center justify-center">
                <CircleDollarSign size={20} />

                <Info size={10} className="absolute right-0 top-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Escolha uma das moedas para sua transferência</p>
            </TooltipContent>
          </Tooltip>

          <Controller
            control={control}
            name="currency"
            render={({ field }) => <SelectCurrency field={field} />}
          />
        </div>

        {errors.currency?.message && (
          <span className="text-sm text-red-500">{errors.currency?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center rounded-sm border border-green-400">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex h-9 w-11 items-center justify-center">
                <FileUser size={20} />

                <Info size={10} className="absolute right-0 top-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Preencha o documento da pessoa para quem você quer fazer a transferência</p>
            </TooltipContent>
          </Tooltip>

          <Input
            placeholder="Digite o número do documento"
            {...register("payeerDocument")}
            maxLength={11}
          />
        </div>

        {errors.payeerDocument?.message && (
          <span className="text-sm text-red-500">{errors.payeerDocument?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center rounded-sm border border-green-400">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex h-9 w-11 items-center justify-center">
                <CalendarIcon size={20} />

                <Info size={10} className="absolute right-0 top-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Escolha a data de transferência</p>
            </TooltipContent>
          </Tooltip>

          <DatePicker
            onDateSelected={(date) => {
              setValue("transferDate", date);
            }}
          />
        </div>

        {errors.transferDate?.message && (
          <span className="text-sm text-red-500">{errors.transferDate?.message}</span>
        )}
      </div>

      <Button
        type="submit"
        className="h-auto bg-green-400 px-5 py-3 text-2xl font-bold text-green-950 hover:bg-green-500"
        disabled={isSubmitting}
      >
        Transferir
      </Button>
    </form>
  );
}
