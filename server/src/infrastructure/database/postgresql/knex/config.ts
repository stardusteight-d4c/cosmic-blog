import { knex as setupKnex, Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const config: Knex.Config = {
  client: "pg",
  connection: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    ssl: process.env.SSLCONNECTION === "true",
  },
  migrations: {
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(config);
