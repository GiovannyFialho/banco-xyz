import axios from "axios";

interface TransferListResponse {
  message: string;
  transfers: {
    value: number;
    date: Date;
    currency: string;
    payeer: {
      document: string;
      name: string;
    };
  }[];
}

interface TransferListParams {
  token: string;
}

export async function transferList({ token }: TransferListParams) {
  const response = await axios.get<TransferListResponse>("/transferList", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
