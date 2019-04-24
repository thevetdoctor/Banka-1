import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';
import password from '../helpers/password';

const client = connection();
client.connect();

const adminPassword = password.hashPassword('scrip#9ju');
const cashierPassword = password.hashPassword('telju2573j');
const userPassword = password.hashPassword('hshdk#5g');

const adminQuery = `INSERT INTO users(firstname, lastname, email, type, password, isAdmin) VALUES 
('james', 'Ugbanu', 'jamesugbanu@gmail.com', 'staff', '${adminPassword}', true) RETURNING *;`;

const cashierQuery = `INSERT INTO users(firstname, lastname, email, type, password, isAdmin) VALUES 
('Osinachi', 'Joseph', 'singlecliq@gmail.com', 'staff', '${cashierPassword}', false) RETURNING *;`;


const userQuery = `INSERT INTO users(firstname, lastname, email, type, password) VALUES 
('Tunde', 'Babatunde', 'tunex@gmail.com', 'client', '${userPassword}') RETURNING *;`;

const dbQueries = `${destroyQuery}${createQuery}${adminQuery}${cashierQuery}${userQuery}`;

client.query(dbQueries, (err, res) => {
  client.end();
});