'use strict';

let sqlDb;

let {giveMeData, giveMeSimilars, giveMeAuthors} = require("./fillings/BooksData");

exports.booksSetup = function(database){
    console.log("DEBUG --> CREATING BOOKS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("books").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("books", table => {
                table.string("isbn").primary();
                table.string("title");
                table.text("description");
                table.text("interview");
                table.integer("numOfPages");
                //author
                table.binary("photo");
                table.enum("type",["paper","ebook"]);
                table.date("pubbDate");
                table.enum("genre",["fantasy","science","western","romance","thriller","biography","horror","children","detective","poetry"]);
                table.enum("theme",["love","war","friendship","death","freedom","justice","power","discovery","security"]);
                //similarTo
                table.enum("status",["available","out of stock"]);
                table.boolean("ourFavorite");
                table.boolean("bestSelling");
                table.enum("currency",["euro","dollar"]);
                table.float("value");
            }).then( () => {
             console.log("DEBUG --> FILLING BOOKS' TABLE");
             return Promise.all(giveMeData()).then( obj => {
               console.log("DEBUG --> FILLING BOOKS' TABLE: ONE ENTRY");
               return sqlDb("books").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}

exports.similarsSetup = function(database){
    console.log("DEBUG --> CREATING SIMILARS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("similars").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("similars", table => {
                table.string("isbn1");
                table.string("isbn2");
                table.unique(["isbn1","isbn2"]);
            }).then( () => {
             console.log("DEBUG --> FILLING SIMILARS' TABLE");
             return Promise.all(giveMeSimilar()).then( obj => {
               console.log("DEBUG --> FILLING SIMILARS' TABLE: ONE ENTRY");
               return sqlDb("similars").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}

exports.books_authorsSetup = function(database){
    console.log("DEBUG --> CREATING BOOKS_AUTHORS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("books_authors").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("books_authors", table => {
                table.string("isbn");
                table.string("author1");
                table.string("author2");
                table.string("author3");
                table.string("author4");
                table.unique(["isbn","author1"]);
            }).then( () => {
             console.log("DEBUG --> FILLING BOOKS_AUTHORS' TABLE");
             return Promise.all(giveMeAuthor()).then( obj => {
               console.log("DEBUG --> FILLING BOOKS_AUTHORS' TABLE: ONE ENTRY");
               return sqlDb("books_authors").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}


let bookMapping = function (obj){
  //Amount creation
  obj.price = { value: obj.value, currency: obj.currency };
  delete obj.value;
  delete obj.currency;

  //Looking for similars
  let similars = [];
  sqlDb("similars").where("isbn1",obj.isbn).select().then(
     data => {
       return data.map( e => {
          return similars.push(e.isbn2);
       });
     });
  obj.similarTo = similars;

  //Looking for authors
  let authors = [];
  sqlDb("books_authors").where("isbn",obj.isbn).select().then(
     data => {
       return data.map( e => {
         authors.push(e.author1);
         if(e.author2)
          authors.push(e.author2);
         if(e.author3)
          authors.push(e.author3);
         if(e.author4)
          authors.push(e.author4);
       });
     });
  obj.author = authors;
  return obj;
}


/**
 * Get all books
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getBooks = function(offset,limit) {
  return sqlDb("books").limit(limit).offset(offset).select().then( data => {
    return data.map( obj => {
      return bookMapping(obj);
    });
  });
}

/**
 * Get a specific book
 *
 * isbn String ISBN of the book to look for
 * returns Book
 **/
exports.getBooksByIsbn = function(isbn) {
  let parsedIsbn = isbn.slice(1, isbn.length -1);
  return sqlDb("books").where("isbn",parsedIsbn).select().then( data => {
    return data.map( obj => {
      return bookMapping(obj);
    });
  });
}


/**
 * Get all books with a specific criterion
 *
 * attribute String Attribute to search on. For example: author, type, genre, ...
 * key String Key of the attribute to the search for
 * returns List
 **/
exports.getBooksFindBy = function(attribute,key) {
  return sqlDb("books").where(attribute,key).select().then( data => {
    return data.map( obj => {
      return bookMapping(obj);
    });
  });
}


/**
 * Get similars book of a specific one
 *
 * isbn String ISBN of the book to look for its similars
 * returns List
 **/
exports.getSimilarBooksByIsbn = function(isbn) {
  let parsedIsbn = isbn.slice(1, isbn.length -1);

  let similars = [];
  sqlDb("similars").where("isbn1",parsedIsbn).select().then(
     data => {
       return data.map( obj => {
         return sqlDb("books").where("isbn",obj.isbn2).select().then( data => {
           return data.map( obj => {
             let newObj = bookMapping(obj);
             return similars.push(newObj);
           });
         });
       });
     });
    return similars;
}
