import { z } from "zod"

const envSchema = z.object({
  GEMINI_API_KEY: z.string().url(),
})

export const env = envSchema.parse(process.env)