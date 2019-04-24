import dotenv from 'dotenv';
import { Client } from 'pg';
import setup from '../config/config';

dotenv.config();
const connection = () => {
  let config;

  if (process.env.NODE_ENV === 'test') {
    config = setup.test.dbTestUrl;
  } else if (process.env.NODE_ENV === 'production') {
    config = setup.production.DATABASE_URL;
  } else {
    config = setup.production.dbUrl;
  }

  //  if(process.env.NODE_ENV === '') {
  //   config = setup.production.DATABASE_URL;
  // }
  //  if(process.env.NODE_ENV === 'development') {
  //   config = setup.production.dbUrl;
  // }
  const client = new Client(config);
  return client;
};


export default connection;
