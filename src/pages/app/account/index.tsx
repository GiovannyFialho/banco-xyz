import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeftRight } from "lucide-react";

import { useUser } from "@/contexts/user-context";
import { formatCurrency } from "@/utils/formatCurrency";

import { balance } from "@/api/balance";
import { transferList } from "@/api/transfer-list";

import { BalanceCard } from "@/components/balance-card";
import { TransactionCard } from "@/components/transaction-card";
import { Skeleton } from "@/components/ui/skeleton";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function Account() {
  const { token } = useUser();

  const { data: balanceData, isLoading: balanceDataLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance({ token })
  });

  const { data: transferListData, isLoading: transferListDataLoading } = useQuery({
    queryKey: ["transfer-list"],
    queryFn: () => transferList({ token })
  });

  const { symbol, formattedValue } = formatCurrency(
    balanceData?.accountBalance,
    balanceData?.currency
  );

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <BalanceCard>
        {balanceDataLoading ? (
          <div className="flex gap-3" data-testid="is-loading">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : balanceData ? (
          <div className="flex gap-3" data-testid="is-ready">
            <span className="text-2xl font-medium text-green-900">{symbol}</span>
            <p
              className="text-6xl font-bold text-green-950 lg:text-6xl xl:text-9xl"
              data-testid="current-balance"
            >
              {formattedValue}
            </p>
          </div>
        ) : (
          <p className="text-sm" data-testid="error">
            Saldo indisponível no momento
          </p>
        )}
      </BalanceCard>

      <TransactionCard>
        {transferListDataLoading ? (
          <div
            className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5"
            data-testid="is-loading"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        ) : transferListData ? (
          <div
            className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5"
            data-testid="is-ready"
          >
            {transferListData.transfers.map((transferItems, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 border-b border-dashed border-b-gray-300 pb-2"
              >
                <div className="flex items-end gap-2">
                  <span className="text-base font-black text-gray-950">
                    {dayjs(transferItems.date).format("DD/MM/YYYY")}
                  </span>

                  <span className="text-sm font-light italic text-gray-950">
                    {dayjs().to(dayjs(transferItems.date))}
                  </span>
                </div>

                <div className="flex gap-3">
                  <ArrowLeftRight />

                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold text-gray-950">
                      {transferItems.payeer.name}
                    </span>

                    <span className="text-base font-normal text-gray-950">
                      {transferItems.value.toLocaleString(transferItems.currency, {
                        style: "currency",
                        currency: transferItems.currency
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" data-testid="error">
            Lista de transferências indisponível no momento
          </p>
        )}
      </TransactionCard>
    </div>
  );
}
