import axios from "axios";

interface BalanceResponse {
  currency: string;
  accountBalance: number;
}

interface BalanceParams {
  token: string;
}

export async function balance({ token }: BalanceParams) {
  const response = await axios.get<BalanceResponse>("/balance", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
