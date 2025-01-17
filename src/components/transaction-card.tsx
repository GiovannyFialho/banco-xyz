import { ArrowLeftRight, ScrollText } from "lucide-react";

export function TransactionCard() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gradient-to-r from-green-100 to-green-500 px-5 py-3 shadow-md">
      <div className="flex flex-col gap-1">
        <div className="ga-1 flex items-start justify-between">
          <h1 className="text-4xl font-bold text-green-800">Transferencias</h1>

          <div className="h-max w-max rounded-full bg-green-950 p-2">
            <ScrollText size={20} className="text-gray-100" />
          </div>
        </div>

        <p className="text-lg font-semibold text-green-800">Confira suas transferencias abaixo</p>
      </div>

      <div className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 border-b border-dashed border-b-gray-300 pb-2"
          >
            <div className="flex flex-col gap-1">
              <span className="text-base font-black text-gray-950">13 de janeiro de 2025</span>
              <span className="text-base font-normal text-gray-950">saldo do dia R$ 2.000,00</span>
            </div>

            <div className="flex gap-3">
              <ArrowLeftRight />

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-950">Outras transferências</span>

                <span className="text-base font-black text-gray-950">Ted d isah29293nsn3x</span>

                <span className="text-base font-normal text-gray-950">- R$ 1000,00</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
