import CryptoJS from "crypto-js";

import { UserData } from "@/contexts/user-context";
import { env } from "@/env";

const SECRET_KEY = env.VITE_ENCRYPTION_SECRET_KEY ?? "";

export const encryptData = (data: UserData): string => {
  if (!SECRET_KEY) {
    throw new Error("Encryption failed: ENCRYPTION_SECRET_KEY is not defined.");
  }

  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): UserData => {
  if (!SECRET_KEY) {
    throw new Error("Decryption failed: ENCRYPTION_SECRET_KEY is not defined.");
  }

  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);

  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    throw new Error("Decryption failed: Invalid encrypted data or key.");
  }
};
