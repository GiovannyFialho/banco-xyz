import { ChartNoAxesColumn } from "lucide-react";

export function BalanceCard() {
  return (
    <div className="flex h-max flex-col gap-4 rounded-lg bg-gradient-to-r from-green-100 to-green-500 p-5 shadow-md">
      <div className="flex flex-col gap-1">
        <div className="ga-1 flex items-start justify-between">
          <h1 className="text-4xl font-bold text-green-800">Saldo</h1>

          <div className="h-max w-max rounded-full bg-green-950 p-2">
            <ChartNoAxesColumn size={20} className="text-gray-100" />
          </div>
        </div>

        <p className="text-lg font-semibold text-green-800">Confira o seu saldo abaixo</p>
      </div>

      <div className="flex">
        <span className="text-2xl font-medium text-green-900">R$</span>
        <p className="text-6xl font-bold text-green-950 lg:text-6xl xl:text-9xl">1.000,00</p>
      </div>
    </div>
  );
}
