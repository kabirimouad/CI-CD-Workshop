import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().positive().default(5000),
    DATABASE_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;