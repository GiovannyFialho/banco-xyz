import { render, screen } from "@testing-library/react";

import { BalanceCard } from "@/components/balance-card";
import { Skeleton } from "@/components/ui/skeleton";

describe("Balance card", () => {
  it("should load card loading", () => {
    render(
      <BalanceCard>
        <div className="flex gap-3" data-testid="is-loading">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-40 w-full" />
        </div>
      </BalanceCard>
    );

    expect(screen.getByTestId("is-loading"));
  });

  it("should load card with error", () => {
    render(
      <BalanceCard>
        <p className="text-sm" data-testid="error">
          Saldo indisponível no momento
        </p>
      </BalanceCard>
    );

    expect(screen.getByTestId("error"));
  });

  it("should load card with data", () => {
    const symbol = "R$";
    const formattedValue = "1.800,00";

    render(
      <BalanceCard>
        <div className="flex gap-3" data-testid="is-ready">
          <span className="text-2xl font-medium text-green-900">{symbol}</span>
          <p className="text-6xl font-bold text-green-950 lg:text-6xl xl:text-9xl">
            {formattedValue}
          </p>
        </div>
      </BalanceCard>
    );

    expect(screen.getByTestId("is-ready"));
  });
});
