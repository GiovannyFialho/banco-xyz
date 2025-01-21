import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { vi, type Mock } from "vitest";

import { useUser } from "@/contexts/user-context";

import { Header } from "@/components/header";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("@/contexts/user-context", () => ({
  useUser: vi.fn()
}));

describe("Header Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderHeader = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("should render the header with user name and menu options", () => {
    (useUser as Mock).mockReturnValue({
      user: { name: "John Doe" },
      clearUserData: vi.fn()
    });

    renderHeader();

    expect(screen.getByTestId("bank-name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  it("should open dropdown menu", async () => {
    (useUser as Mock).mockReturnValue({
      user: { name: "John Doe" },
      clearUserData: vi.fn()
    });

    renderHeader();

    const user = userEvent.setup();
    const triggerButton = screen.getByTestId("trigger-menu");

    await user.click(triggerButton);

    expect(triggerButton).toHaveAttribute("aria-expanded", "true");
  });
});
