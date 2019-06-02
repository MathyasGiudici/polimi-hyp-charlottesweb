'use strict';

let sqlDb;
let {giveMeData, giveMeSimilars} = require("./fillings/BooksData");

exports.booksSetup = function(database){
    console.log("DEBUG --> CREATING BOOKS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("books").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("books", table => {
                table.string("isbn").primary();
                table.string("author1");
                table.string("author2");
                table.string("author3");
                table.string("author4");
                table.string("title");
                table.text("description");
                table.text("interview");
                table.integer("numOfPages");
                table.text("photo");
                table.enum("type",["paper","ebook"]);
                table.date("pubbDate");
                table.enum("genre",["fantasy","science","western","romance","thriller","biography","horror","children","detective","poetry"]);
                table.enum("theme",["love","war","friendship","death","freedom","justice","power","discovery","security"]);
                table.enum("status",["available","out of stock"]);
                table.boolean("ourFavorite");
                table.boolean("bestSelling");
                table.float("value");
                table.enum("currency",["euro","dollar"]);
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
             return Promise.all(giveMeSimilars()).then( obj => {
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


let bookMapping = function(obj){

  //Creating authors' array of ids
  obj.authorsIDs = [];

  obj.authorsIDs.push(obj.author1);
  if(obj.author2)
    obj.authorsIDs.push(obj.author2);

  if(obj.author3)
    obj.authorsIDs.push(obj.author3);

  if(obj.author4)
    obj.authorsIDs.push(obj.author4);

  delete obj.author1;
  delete obj.author2;
  delete obj.author3;
  delete obj.author4;

  //Creating price
  obj.price = { value: obj.value, currency: obj.currency};
  delete obj.value;
  delete obj.currency;

  return obj;
}

let bookUpdating = function(container){
  let books = container.books;

  //Book scanning
  books.forEach( b => {
    //Inits
    b.similarTo = [];
    b.authors = [];

    //Similars creation
    container.similars.forEach( s => {
      if(s.isbn1 == b.isbn)
        b.similarTo.push(s.isbn2);
    });

    //Authors linking
    container.authors.forEach( a => {
      b.authorsIDs.forEach( i => {
        if (i == a.id)
          b.authors.push(a);
      });
    });

    delete b.authorsIDs;
  });

  return books;
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
      //Mapping books
      return bookMapping(obj);
    });
  }).then( books => {
    //Retreving similars
    return sqlDb("similars").select().then( similars => {
      let container = {};
      container.books = books;
      container.similars = similars;
      return container;
    });
  }).then( container => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      container.authors = authors;
      return container;
    });
  }).then( container => {
    //Recreating correct object books
    return bookUpdating(container);
  });
}

exports.getBooksOurFavorite = function() {
  return sqlDb("books").where(sqlDb.raw('"ourFavorite"')).select().then( data => {
    return data.map( obj => {
      //Mapping books
      return bookMapping(obj);
    });
  }).then( books => {
    //Retreving similars
    return sqlDb("similars").select().then( similars => {
      let container = {};
      container.books = books;
      container.similars = similars;
      return container;
    });
  }).then( container => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      container.authors = authors;
      return container;
    });
  }).then( container => {
    //Recreating correct object books
    return bookUpdating(container);
  });
}

exports.getBooksBestSelling = function() {
  return sqlDb("books").where(sqlDb.raw('"bestSelling"')).select().then( data => {
    return data.map( obj => {
      //Mapping books
      return bookMapping(obj);
    });
  }).then( books => {
    //Retreving similars
    return sqlDb("similars").select().then( similars => {
      let container = {};
      container.books = books;
      container.similars = similars;
      return container;
    });
  }).then( container => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      container.authors = authors;
      return container;
    });
  }).then( container => {
    //Recreating correct object books
    return bookUpdating(container);
  });
}

/**
 * Get a specific book
 *
 * isbn String ISBN of the book to look for
 * returns Book
 **/
exports.getBooksByIsbn = function(isbn) {
  return sqlDb("books").where("isbn",isbn).select().then( data => {
    return data.map( obj => {
      //Mapping books
      return bookMapping(obj);
    });
  }).then( books => {
    //Retreving similars
    return sqlDb("similars").select().then( similars => {
      let container = {};
      container.books = books;
      container.similars = similars;
      return container;
    });
  }).then( container => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      container.authors = authors;
      return container;
    });
  }).then( container => {
    //Recreating correct object books
    return bookUpdating(container);
  }).then(  data => { return data[0];});
}


/**
 * Get all books with a specific criterion
 *
 * attribute String Attribute to search on. For example: author, type, genre, ...
 * key String Key of the attribute to the search for
 * returns List
 **/
exports.getBooksFindBy = function(attribute,key) {
 if(attribute != 'author') {
   return sqlDb("books").where(attribute,key).select().then( data => {
     return data.map( obj => {
       //Mapping books
       return bookMapping(obj);
     });
   }).then( books => {
     //Retreving similars
     return sqlDb("similars").select().then( similars => {
       let container = {};
       container.books = books;
       container.similars = similars;
       return container;
     });
   }).then( container => {
     //Retreving authors
     return sqlDb("authors").select().then( authors => {
       container.authors = authors;
       return container;
     });
   }).then( container => {
     //Recreating correct object books
     return bookUpdating(container);
   });
 } else{
   return sqlDb("books").where("author1",key).select().then( data1 => {
     return sqlDb("books").where("author2",key).select().then( data2 => {
       return sqlDb("books").where("author3",key).select().then( data3 => {
         return sqlDb("books").where("author4",key).select().then( data4 => {
           let final = data1.concat(data2).concat(data3).concat(data4);
           return final;
         });
       });
     });
   }).then( data => {
     return data.map( obj => {
       //Mapping books
       return bookMapping(obj);
     });
   })
     .then( books => {
     //Retreving similars
     return sqlDb("similars").select().then( similars => {
       let container = {};
       container.books = books;
       container.similars = similars;
       return container;
     });
   }).then( container => {
     //Retreving authors
     return sqlDb("authors").select().then( authors => {
       container.authors = authors;
       return container;
     });
   }).then( container => {
     //Recreating correct object books
     return bookUpdating(container);
   });
 }
}


/**
 * Get similars book of a specific one
 *
 * isbn String ISBN of the book to look for its similars
 * returns List
 **/
exports.getSimilarBooksByIsbn = function(isbn) {
  return sqlDb("similars").where("isbn1",isbn).select().then( data => {
    return data.map( e => { return e.isbn2 });
  }).then( similarsIDs => {
    let container = {};
    container.similarsIDs = similarsIDs;
    return container;
  }).then( container => {
    //Retriving books
    return sqlDb("books").select().then( books => {
      books.forEach(b => {return bookMapping(b);});
      container.books = books;
      return container;
    });
  }).then( container => {
    //Retreving similars
    return sqlDb("similars").select().then( similars => {
      container.similars = similars;
      return container;
    });
  }).then( container => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      container.authors = authors;
      return container;
    });
  }).then( container => {
    //Recreating correct object books
    let books = bookUpdating(container);
    let toBeRet = [];

    container.similarsIDs.forEach( i => {
      books.forEach( b => {
        if(b.isbn == i)
          toBeRet.push(b);
      });
    });

    return toBeRet;
  });
}
