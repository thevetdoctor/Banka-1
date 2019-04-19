import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';
import password from '../helpers/password';

const client = connection();
client.connect();

const userPassword = password.hashPassword('scrip#9ju');
const adminQuery = `INSERT INTO users(firstname, lastname, email, type, password, isAdmin) VALUES 
('james', 'Ugbanu', 'jamesugbanu@gmail.com', 'staff', '${userPassword}', true) RETURNING *;`;


const dbQueries = `${destroyQuery}${createQuery}${adminQuery}`;

client.query(dbQueries, (err, res) => {
  client.end();
});