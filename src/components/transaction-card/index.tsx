import { ScrollText } from "lucide-react";
import { ReactNode } from "react";

import { TransferAction } from "@/components/transfer-action";

interface TransactionCardProps {
  children: ReactNode;
}

export function TransactionCard({ children }: TransactionCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 rounded-lg bg-gradient-to-r from-green-100 to-green-500 px-5 py-3 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="ga-1 flex items-start justify-between">
            <h1 className="text-4xl font-bold text-green-800">Transferências</h1>

            <div className="h-max w-max rounded-full bg-green-950 p-2">
              <ScrollText size={20} className="text-gray-100" />
            </div>
          </div>

          <p className="text-lg font-semibold text-green-800">Confira suas transferências abaixo</p>
        </div>

        {children}
      </div>

      <TransferAction />
    </div>
  );
}
