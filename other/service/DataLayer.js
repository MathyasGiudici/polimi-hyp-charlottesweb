const sqlDbFactory = require('knex');

let sqlDb;

let {booksSetup,similarsSetup,books_authorsSetup} = require("./BooksService");
let {authorsSetup} = require("./AuthorService");

exports.initSqlDb = function(){
  console.log("DEBUG --> CREATING DB");
    sqlDb = sqlDbFactory({
      debug: true,
      client: "pg",
      connection: process.env.DATABASE_URL,
      ssl: true
    });

    console.log("DEBUG --> CREATING TABLES");
    return Promise.all([booksSetup(sqlDb), similarsSetup(sqlDb), books_authorsSetup(sqlDb), authorsSetup(sqlDb)]);
}
