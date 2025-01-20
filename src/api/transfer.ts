import axios from "axios";
import dayjs from "dayjs";

interface TransferResponse {
  status: "success" | "error";
}

interface TransferParams {
  token: string;
  value: number;
  currency: "USD" | "EUR" | "BRL";
  payeerDocument: string;
  transferDate: Date;
}

export async function transfer({
  token,
  value,
  currency,
  payeerDocument,
  transferDate
}: TransferParams) {
  const response = await axios.post<TransferResponse>(
    `/transfer`,
    {
      value,
      currency,
      payeerDocument,
      transferDate: dayjs(transferDate).format("YYYY-MM-DD")
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
