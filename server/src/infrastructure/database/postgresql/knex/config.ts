import { knex as setupKnex, Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const config: Knex.Config = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5438,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(config);
