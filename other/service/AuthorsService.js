'use strict';

let sqlDb;
let {giveMeData} = require("./fillings/AuthorsData");

exports.authorsSetup = function(database){
    console.log("DEBUG --> CREATING AUTHORS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("authors").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("authors", table => {
                table.string("id").primary();
                table.string("name");
                table.string("surname");
                table.text("bio");
                table.binary("photo");
            }).then( () => {
             console.log("DEBUG --> FILLING AUTHORS' TABLE");
             return Promise.all(giveMeData()).then( obj => {
               console.log("DEBUG --> FILLING AUTHORS' TABLE: ONE ENTRY");
               return sqlDb("authors").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}

/**
 * Get all authors
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getAuthors = function(offset,limit) {
  return sqlDb("authors").limit(limit).offset(offset).select();
}


/**
 * Get a specific author
 *
 * id String Id of the author to look for
 * returns Author
 **/
exports.getAuthorsById = function(id) {
  let parsedId = id.slice(1, isbn.length -1);
  return sqlDb("authors").where("id",parsedId).select();
}
