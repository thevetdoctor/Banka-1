const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const accountsDestroy = 'DROP TABLE IF EXISTS accounts CASCADE; ';
const transactionsDestroy = 'DROP TABLE IF EXISTS transactions CASCADE; ';

const destroyQuery = `${usersDestroy}${accountsDestroy}${transactionsDestroy}`;

export default destroyQuery;
