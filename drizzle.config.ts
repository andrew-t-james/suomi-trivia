import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!("DATABASE_URL" in process.env)) {
  throw new Error("DATABASE_URL not found on .env.development");
}

export default {
  // this is where our drizzle schema is referenced.
  schema: "./src/lib/db/schema.ts",

  // this is where the database migrations will be stored.
  out: "./src/lib/db/migrations",

  // Authorizes our connection to PlanetScale via Drizzle ORM.
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },

  // This is necessary if you want to use drizzle to
  // manage the database tables using a UI later on.
  driver: "mysql2",

  // This is necessary when working with mySQL databases
  // because they don't support DDL alternation statements
  // in one transaction.
  breakpoints: true,
} satisfies Config;
