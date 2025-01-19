import { useQuery } from "@tanstack/react-query";
import { ChartNoAxesColumn } from "lucide-react";

import { balance } from "@/api/balance";
import { useUser } from "@/contexts/user-context";
import { formatCurrency } from "@/utils/formatCurrency";

import { Skeleton } from "@/components/ui/skeleton";

export function BalanceCard() {
  const { token } = useUser();

  const { data: balanceData, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance({ token })
  });

  if (isLoading) {
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

        <div className="flex gap-3">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!balanceData) {
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

        <p className="text-sm">Saldo indisponível no momento</p>
      </div>
    );
  }

  const { symbol, formattedValue } = formatCurrency(
    balanceData.accountBalance,
    balanceData.currency
  );

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
        <span className="text-2xl font-medium text-green-900">{symbol}</span>
        <p className="text-6xl font-bold text-green-950 lg:text-6xl xl:text-9xl">
          {formattedValue}
        </p>
      </div>
    </div>
  );
}
