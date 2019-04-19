import connection from '../helpers/conn';

const client = connection();
client.connect();

 const dbQuery = (query) => {

 	return new Promise((resolve, reject) => {
 		client.query(query)
 		 .then(res => { 
 		 	resolve(res)
 		 })
 		 .catch(err => {
 		 	reject(err)
 		 })
 	})

   }


export default {dbQuery};