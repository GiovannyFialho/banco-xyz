import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["production", "development", "test"]),
  VITE_ENCRYPTION_SECRET_KEY: z.string()
});

export const env = envSchema.parse(import.meta.env);
