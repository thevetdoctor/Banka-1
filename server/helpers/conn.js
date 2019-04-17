import dotenv from 'dotenv';
import { Client } from 'pg';
import setup from '../config/config';

dotenv.config();
const connection = () => {
  let config;
  if (process.env.NODE_ENV === 'development') {
    config = setup.development.dbUrl;
  } else {
    config = setup.production.DATABASE_URL;
  }
  const client = new Client(config);
  return client;
};


export default connection;