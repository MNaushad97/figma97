import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    //configures Logging
    //In dev, logs queries, warnings, and errors.
    //In prod, logs only errors.
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  //to store the Prisma instance globally.
  //prevents multiple connections being created during hot reloads in development.
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/*

All this cater:
- In development, when the backend reloads due to file changes, a new Prisma Client instance would otherwise be created each time
- In production, no global variable is used, ensuring clean initialization.

*/
