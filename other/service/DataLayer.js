const sqlDbFactory = require('knex');

let sqlDb;

let {booksSetup,similarsSetup} = require("./BooksService");
let {authorsSetup} = require("./AuthorsService");
let {eventsSetup} = require("./EventsService");
let {reviewsSetup} = require("./ReviewsService");
let {usersSetup, cartsSetup} = require("./UsersService");

exports.initSqlDb = function(){
  console.log("DEBUG --> CREATING DB");
    sqlDb = sqlDbFactory({
      debug: true,
      client: "pg",
      connection: process.env.DATABASE_URL,
      ssl: true
    });

    console.log("DEBUG --> CREATING TABLES");
    return Promise.all([booksSetup(sqlDb), similarsSetup(sqlDb),
      authorsSetup(sqlDb), eventsSetup(sqlDb),
      usersSetup(sqlDb), cartsSetup(sqlDb), reviewsSetup(sqlDb) ]);
}
