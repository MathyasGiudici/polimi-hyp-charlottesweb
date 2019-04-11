const sqlDbFactory = require('knex');

let sqlDb;

let {bookSetup} = require("./BookService");
let {authorSetup} = require("./AuthorService");

exports.initSqlDb = function(){
  console.log("DEBUG --> CREATING DB");
    sqlDb = sqlDbFactory({
      debug: true,
      client: "pg",
      connection: process.env.DATABASE_URL,
      ssl: true
    });

    console.log("DEBUG --> CREATING TABLES");
    return Promise.all([bookSetup(sqlDb), authorSetup(sqlDb)]);
}
