'use strict';

let sqlDb;
let {giveMeData, giveMeCartData} = require("./fillings/UsersData");

exports.usersSetup = function(database){
    console.log("DEBUG --> CREATING USERS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("users").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("users", table => {
                table.string("email").primary();
                table.string("firstName");
                table.string("lastName");
                table.string("password");
                table.enum("gender",["female","male"]);
                table.date("birthDay");
                table.binary("photo");
                table.enum("userType",["user","admin"]);
            }).then( () => {
             console.log("DEBUG --> FILLING USERS' TABLE");
             return Promise.all(giveMeData()).then( obj => {
               console.log("DEBUG --> FILLING USERS' TABLE: ONE ENTRY");
               return sqlDb("users").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}

exports.cartsSetup = function(database){
    console.log("DEBUG --> CREATING CARTS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("carts").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("carts", table => {
                table.string("email"); //Check email
                table.string("book");
                table.float("value");
                table.enum("currency",["euro","dollar"]);
                table.unique(["email","book"]);
            }).then( () => {
             console.log("DEBUG --> FILLING CARTS' TABLE");
             return Promise.all(giveMeCartData()).then( obj => {
               console.log("DEBUG --> FILLING USERS' CARTS: ONE ENTRY");
               return sqlDb("carts").insert(obj);
             });
            });
        }
        else{
          return true;
        }
    });
}


let getCartHandler = function(email){
  let tBooks = [];
  let tValue = 0;
  let tCurrency;
  sqlDb("carts").where("email",email).select().then(
     data => {
       return data.map( e => {
          tValue+ = e.value;
          tCurrency = e.currency;
          return tBooks.push(e.book);
       });
     });

  let obj = {};
  obj.id = email;
  obj.books = tBooks;
  obj.price = { value: tValue, currency: tCurrency };

  return obj;
}


/**
 * Delete my user
 *
 * returns String
 **/
exports.deleteUsersMe = function(email) {
  return sqlDb("users").where("email",email).del().then(function(e){
    return email;
  });
}


/**
 * Get my user's cart
 *
 * returns Cart
 **/
exports.getCart = function(email) {
  return getCartHandler(email);
}


/**
 * Get my user
 *
 * returns User
 **/
exports.getUsersMe = function(email) {
  return sqlDb("users").where("email",email).select().then(
     data => {
       return data.map( e => {
          delete e.password;
       });
     });
}


/**
 * Login with a form
 *
 * email String
 * password String
 * no response value expected for this operation
 **/
exports.postUsersLogin = function(email,password) {
  return sqlDb("users").where("email",email).where("password",password).select();
}

/**
 * Register into the store
 *
 * body User User to sign-up
 * returns List
 **/
exports.postUsersRegister = function(body) {
  return sqlDb("users").insert(body).then(
     data => {
       return data.map( e => {
          delete e.password;
       });
     });
}


/**
 * Update my user's cart
 *
 * body Cart Updated Cart of my User
 * returns Cart
 **/
exports.putCart = function(body) {
  if(body.books.size()==0){
    return sqlDb("carts").where("email",body.email).del().then(function(e){
      let obj = {};
      obj.id = body.email;
      obj.books = [];
      obj.price = { value: 0, currency: "euro" };
      return obj;
    });
  }
  else{
    return sqlDb("carts").where("email",body.email).select().then(
      data => {
        dbBooks = [];

        data.forEach( e => {
          dbBooks.push(e.book);
          if(!(e.book in body.books)){
            sqlDb("carts").where("email",body.email).where("book",e.book).del();
          }
        });
        body.books.forEach( e =>{
          if(!(e in dbBooks)){
            let book = sqlDb("books").where("isbn",e).select();
            sqlDb("carts").insert({
              email : body.email,
              book : book.isbn,
              value : book.value,
              currency : book.currency
            });
          }
        });

        return getCartHandler(body.email);
      }
    );
  }
}


/**
 * Update my user profile
 *
 * body User My User updated
 * returns User
 **/
exports.putUsersMe = function(body) {
  return sqlDb("users").where("email",body.email).update(body).then(
     data => {
       return data.map( e => {
          delete e.password;
       });
    });
}
