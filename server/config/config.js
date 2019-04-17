import dotenv from "dotenv";

dotenv.config();

export default {
	secretKey: process.env.SECRET_KEY,
  development: {
    dbUrl: process.env.DB_URL,
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};