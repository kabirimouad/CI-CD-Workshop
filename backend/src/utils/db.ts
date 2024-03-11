import { PrismaClient, User } from "@prisma/client";
import { hash } from "argon2";
import env from "./env";

const c = new PrismaClient({
    errorFormat: "pretty",
    log:
        env.NODE_ENV === "production"
            ? ["warn", "error"]
            : ["query", "info", "warn"],
});

export const prisma = c.$extends({
    name: "PasswordHashExtension",
    query: {
        user: {
            async create({ args, query }) {
                args.data.password = await hash(args.data.password);
                return await query(args);
            },
            async createMany({ args, query }) {
                if (Array.isArray(args.data))
                    args.data = await Promise.all(
                        args.data.map(async (r) => {
                            r.password = await hash(r.password);
                            return r;
                        })
                    );
                else args.data.password = await hash(args.data.password);

                return await query(args);
            },
            async update({ args, query }) {
                if (args.data.password) {
                    if (typeof args.data.password === "string")
                        args.data.password = await hash(args.data.password);
                    else if (args.data.password.set)
                        args.data.password.set = await hash(
                            args.data.password.set
                        );
                }

                return await query(args);
            },
            async updateMany({ args, query }) {
                if (args.data.password) {
                    if (typeof args.data.password === "string")
                        args.data.password = await hash(args.data.password);
                    else if (args.data.password.set)
                        args.data.password.set = await hash(
                            args.data.password.set
                        );
                }

                return await query(args);
            },
        },
    },
});

export default prisma;
