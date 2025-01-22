import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  onDateSelected: (date: Date) => void;
}

export function DatePicker({ onDateSelected }: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      onDateSelected(date);
      setOpen(false);
    }
  }, [date, onDateSelected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          data-testid="field-transferDate"
          className={cn(
            "w-full justify-start border-0 text-left font-normal outline-none focus-visible:ring-0",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start" data-testid="calendar">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
          disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
