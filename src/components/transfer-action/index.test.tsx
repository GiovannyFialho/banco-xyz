import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import { TransferAction } from "@/components/transfer-action";
import { TooltipProvider } from "@/components/ui/tooltip";

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe("Transfer action", () => {
  let queryClient: QueryClient;
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderTransferAction = async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TooltipProvider>
            <TransferAction />
          </TooltipProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const triggerButton = screen.getByTestId("trigger-transfer");
    await user.click(triggerButton);
  };

  it("should render modal open", async () => {
    await renderTransferAction();

    expect(screen.getByTestId("form-transfer")).toBeInTheDocument();
  });

  it("should render an error when trying to submit without data", async () => {
    await renderTransferAction();

    await user.click(screen.getByTestId("submit-transfer"));

    expect(screen.getByTestId("value-error")).toBeInTheDocument();
    expect(screen.getByTestId("currency-error")).toBeInTheDocument();
    expect(screen.getByTestId("payeerDocument-error")).toBeInTheDocument();
    expect(screen.getByTestId("transferDate-error")).toBeInTheDocument();
  });
});
