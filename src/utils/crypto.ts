import CryptoJS from "crypto-js";

import { UserData } from "@/contexts/user-context";

const SECRET_KEY = "4IVeTMx/LYWEicQBtp6ebOSvrufStOmDCPt4RvRUtnM=";

export const encryptData = (data: UserData): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): UserData => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
