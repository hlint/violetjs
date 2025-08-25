import { z } from "zod";

const message1 = "is required for auth.js";
const message2 = "is required for current auth provider";

const EnvSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "must be greater than 0",
    })
    .default(3000),
  AUTH_SECRET: z.string(message1).min(1, message1),
  AUTH_GITHUB_ID: z.string(message2).min(1, message2),
  AUTH_GITHUB_SECRET: z.string(message2).min(1, message2),
});

const { error, data } = EnvSchema.safeParse(process.env);

if (error) {
  for (const issue of error.issues) {
    console.error(
      ["Env error:", issue.path.join("."), issue.message].join(" "),
    );
  }
  process.exit(1);
}

export const env = data;
