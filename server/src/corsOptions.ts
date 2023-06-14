import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import dotenv from "dotenv";

dotenv.config();
const domain = process.env.ORIGIN;

export const corsOptions: CorsOptions = {
  origin: domain,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
