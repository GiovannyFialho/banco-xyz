import { DollarSign, Info, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { useMediaQuery } from "@/hooks/use-media-query";

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
          <Button className="h-auto w-max bg-green-900 px-6 py-3 text-base hover:bg-green-950">
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

          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="h-auto w-full bg-green-900 px-6 py-3 text-base hover:bg-green-950">
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

        <ProfileForm className="px-4" />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setValue(inputValue);
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="flex items-center rounded-sm border border-green-400 px-3 pl-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex h-9 w-9 items-center justify-center">
              <DollarSign size={20} />

              <Info size={10} className="absolute right-0 top-1" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preencha o valor que você deseja transferir</p>
          </TooltipContent>
        </Tooltip>

        <Input placeholder="30" value={value} onChange={handleChange} />
      </div>

      <Button
        type="submit"
        className="h-auto bg-green-400 px-5 py-3 text-2xl font-bold text-gray-950 hover:bg-green-500"
      >
        Transferir
      </Button>
    </form>
  );
}
