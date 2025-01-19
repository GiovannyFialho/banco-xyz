import axios from "axios";

interface SignResponseData {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInBody) {
  const response = await axios.post<SignResponseData>("/login", {
    email,
    password
  });

  return response.data;
}
