import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode } from "react";
import { MemoryRouter } from "react-router";

import { TransactionCard } from "@/components/transaction-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

describe("Transaction card", () => {
  const data = [
    {
      value: 100,
      date: "2025-01-20",
      currency: "US$",
      payeer: {
        document: "12345678",
        name: "John Doe"
      }
    }
  ];

  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderTransactionCard = (ui: ReactNode) => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TooltipProvider>
            <TransactionCard>{ui}</TransactionCard>
          </TooltipProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("should load card with loading", () => {
    renderTransactionCard(
      <div
        className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5"
        data-testid="is-loading"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );

    expect(screen.getByTestId("is-loading")).toBeInTheDocument();
  });

  it("should load card with error", () => {
    renderTransactionCard(
      <p className="text-sm" data-testid="error">
        Lista de transferências indisponível no momento
      </p>
    );

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("should load card with data", () => {
    renderTransactionCard(
      <div
        className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5"
        data-testid="is-ready"
      >
        {data.map((item) => (
          <div key={item.payeer.document}>
            <p>{item.value}</p>
            <p>{item.date}</p>
            <p>{item.currency}</p>
            <p>{item.payeer.document}</p>
            <p>{item.payeer.name}</p>
          </div>
        ))}
      </div>
    );

    expect(screen.getByTestId("is-ready")).toBeInTheDocument();
  });

  it("should open transfer modal", async () => {
    renderTransactionCard(
      <div
        className="custom-scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto rounded-lg border border-green-400 bg-green-100 px-5 py-5"
        data-testid="is-ready"
      >
        {data.map((item) => (
          <div key={item.payeer.document}>
            <p>{item.value}</p>
            <p>{item.date}</p>
            <p>{item.currency}</p>
            <p>{item.payeer.document}</p>
            <p>{item.payeer.name}</p>
          </div>
        ))}
      </div>
    );

    const user = userEvent.setup();
    const triggerButton = screen.getByTestId("trigger-transfer");

    await user.click(triggerButton);

    expect(triggerButton).toHaveAttribute("aria-expanded", "true");
  });
});
