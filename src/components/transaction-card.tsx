import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeftRight, ScrollText } from "lucide-react";

import { transferList } from "@/api/transfer-list";
import { useUser } from "@/contexts/user-context";

import { TransferAction } from "@/components/transfer-action";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function TransactionCard() {
  const { token } = useUser();

  const { data: transferListData, isLoading } = useQuery({
    queryKey: ["transfer-list"],
    queryFn: () => transferList({ token })
  });

  if (isLoading) {
    return <p>carregando</p>;
  }

  if (!transferListData?.transfers) {
    return <p>não tem nada</p>;
  }

  const { transfers } = transferListData;

  return (
    <div className="flex flex-col gap-3">
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
          {transfers.map((transferItems, index) => (
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
      </div>

      <TransferAction />
    </div>
  );
}
