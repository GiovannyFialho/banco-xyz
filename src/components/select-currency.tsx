import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface SelectCurrencyProsp {
  field: ControllerRenderProps<
    {
      value: number;
      currency: "USD" | "EUR" | "BRL";
      payeerDocument: string;
      transferDate: Date;
    },
    "currency"
  >;
}

export function SelectCurrency({ field }: SelectCurrencyProsp) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-full border-0 outline-none focus:ring-0">
        <SelectValue placeholder="Selecione uma moeda" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Moedas</SelectLabel>
          <SelectItem value="USD">Estados Unidos</SelectItem>
          <SelectItem value="EUR">Euro</SelectItem>
          <SelectItem value="BRL">Brasil</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
