const createUserTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR (40) NOT NULL,
    lastName VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255),
    type VARCHAR(10) DEFAULT 'client',
    isAdmin INTEGER DEFAULT 0,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createAccountTable = `
  CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY NOT NULL,
    accountNumber INTEGER NOT NULL,
    owner INTEGER REFERENCES users(id),
    type VARCHAR(10), 
    status VARCHAR(10), 
    balance NUMERIC(10,2),
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createTransactionTable = `
  CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY NOT NULL,
    accountNumber INTEGER NOT NULL,
    cashier INTEGER,
    amount NUMERIC(10,2),
    oldBalance NUMERIC(10,2),
    newBalance NUMERIC(10,2),
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createQuery = `${createUserTable}${createAccountTable}${createTransactionTable}`;
export default createQuery;