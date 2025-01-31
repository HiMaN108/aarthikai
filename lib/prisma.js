import { PrismaClient } from "@prisma/client";


export const db= globalThis.prsima || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// The code ensures singleton behavior for PrismaClient by storing it in globalThis.
// It differentiates between development and production environments to optimize database connections.
// This pattern is highly recommended for serverless or hot-reloading environments to prevent database connection issues.