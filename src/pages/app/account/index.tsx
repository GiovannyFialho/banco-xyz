import { BalanceCard } from "@/components/balance-card";
import { TransactionCard } from "@/components/transaction-card";

export function Account() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <BalanceCard />

      <TransactionCard />
    </div>
  );
}
