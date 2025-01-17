import axios from "axios";

export async function authenticate(email: string, password: string) {
  const response = await axios.post(
    "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login",
    {
      email,
      password
    }
  );

  return response.data;
}
