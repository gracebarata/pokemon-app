// this file connects to the database in the cloud

const { Pool } = require("pg"); // postgres for interacting with the database- to install, type in teminal: npm install pg

// const pool = new Pool({
//   user: "postgres",
//   host: "35.234.136.103",
//   database: "postgres",
//   password: "gracesql"
// });
// this is insecure esp if we are pushing up to git, we don't want oters to gain access to our password etc

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback); // query is a method? which is given to us by node. see comment below to understand this syntax
  }
};

// or
// // function query (text, params, callback){
// return pool.query(text, params, callback)
// }
// and then export query in module.exports
