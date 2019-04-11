'use strict';

let sqlDb;

let {giveMeData} = require("./fillings/BooksData");

exports.bookSetup = function(database){
    console.log("DEBUG --> CREATING BOOK'S TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("book").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("book", table => {
                table.string("isbn").primary();
                table.string("title");
                table.text("description");
                table.text("interview");
                table.integer("numOfPages");
                table.string("author");
                // ------------------------------
                // TODO must be completed
                // ------------------------------
            }).then( () => {
             console.log("DEBUG --> FILLING BOOK'S TABLE");
             return Promise.all(giveMeData()).then( obj => {
               console.log("DEBUG --> FILLING BOOK'S TABLE: ONE ENTRY");
               return sqlDb("book").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}


/**
 * Get all books
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getBooks = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
}, {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific book
 *
 * isbn String ISBN of the book to look for
 * returns Book
 **/
exports.getBooksByIsbn = function(isbn) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
}, {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get similars book of a specific one
 *
 * isbn String ISBN of the book to look for its similars
 * returns List
 **/
exports.getSimilarBooksByIsbn = function(isbn) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
}, {
  "isbn" : "9788804666639",
  "title" : "La solitudine dei numeri primi",
  "description" : "La solitudine dei numeri primi description",
  "interview" : "Il primo best seller sulla matematica",
  "numOfPages" : 266,
  "author" : {
    "id" : "authorA001",
    "name" : "Paolo",
    "surname" : "Giordano",
    "bio" : "il fisico romanziere"
  },
  "photo" : "",
  "type" : "paper",
  "pubbDate" : "2016-5-26",
  "genre" : "romance",
  "theme" : "love",
  "similarTo" : [ "9788867024766", "9788804606246" ],
  "status" : "available",
  "ourFavorite" : false,
  "bestSelling" : true,
  "price" : {
    "value" : "14,00",
    "currency" : "euro"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
