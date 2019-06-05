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
                table.integer("quantity");
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


let getCartHandler = function(email,data){
  if(data.length == 0){
    let obj = {};
    obj.id = email;
    obj.books = [];
    obj.price = { value: 0, currency: "euro" };
    return obj;
  }

  //Inits
  let tBooks = [];
  let tValue = 0;
  let tCurrency;

  //Creating cart's amount
  data.forEach( c => {
     tValue = tValue + (c.value*c.quantity);
     tCurrency = c.currency;
     tBooks.push({
       book: c.book,
       quantity: c.quantity
     });
  });

  //Preparing returning object
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
exports.deleteUsersMe = function(email,req) {
  return sqlDb("users").where("email",email).del().then(function(response){
    if(response){
      req.session.isLoggedIn = false;
      req.session.email = "";
      return {response: email};
    } else {
      return {response: "Something gets wrong"};
    }
  });
}


/**
 * Get my user's cart
 *
 * returns Cart
 **/
exports.getCart = function(email) {
  return sqlDb("carts").where("email",email).select().then(
     data => {
       return getCartHandler(email,data);
      });
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
          return e;
       });
     }).then( data => {return data[0];});
}


/**
 * Login with a form
 *
 * email String
 * password String
 * no response value expected for this operation
 **/
exports.postUsersLogin = function(email,password,req) {
  return sqlDb("users").where("email",email).where("password",password).select().then( data => {
    if(data.length > 0 ){
      req.session.email = email;
      req.session.isLoggedIn = true;
      return {response: "Successful login"};
    }
    else{
      return {response: "You must be registered"};
    }
  });
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
       return sqlDb("users").where("email",body.email).select().then(
          data => {
            return data.map( e => {
               delete e.password;
               return e;
            });
          }).then( data => {return data[0];});
     });
}


/**
 * Update my user's cart
 *
 * body Cart Updated Cart of my User
 * returns Cart
 **/
exports.putCart = function(body) {
  if(body.books.length == 0){
    return sqlDb("carts").where("email",body.id).del().then(function(e){
      let obj = {};
      obj.id = body.id;
      obj.books = [];
      obj.price = { value: 0, currency: "euro" };
      return obj;
    });
  } else{
    return sqlDb("carts").where("email",body.id).select().then( dbCart => {
      //Retreving books to delete
      if(dbCart.length != 0){
        //Deleting books that are not still in cart
        let toBeDel = [];
        //Mapping books
        let mapArray = body.books.map( e => {return e.book});

        dbCart.forEach( e => {
          if(!(mapArray.includes(e.book))){
            toBeDel.push(e.book);
          }
        });

        return sqlDb("carts").where("email",body.id).whereIn("book", toBeDel).del();
      }
      else{
        return dbCart;
      }
    }).then( something => {
      return sqlDb("carts").where("email",body.id).select()
      .then( dbCart => { return dbCart.map( o => { return o.book});})
      .then( dbCart => {
        //Preparing books
        let container = {};
        container.toInsert = [];
        container.toUpdate = [];

        //Choosing array
        body.books.forEach( b => {
          if(dbCart.includes(b.book)){
            container.toUpdate.push(b);
          }
          else{
            container.toInsert.push(b);
          }
        });

        return container;
      });
    }).then( container => {
      let promises = [];

      container.toInsert.forEach( b => {
        promises.push( new Promise( (resolve, reject) => {
            return sqlDb("books").where("isbn",b.book).select().then( data => {
              return sqlDb("carts").insert({
                email : body.id,
                book : b.book,
                quantity: b.quantity,
                value : data[0].value,
                currency : data[0].currency
              });
            }).then(resolve("done"));
        }));
      });

      return Promise.all(promises).then( promises => {return container});
    }).then( container => {
      let promises = [];

      container.toUpdate.forEach( b => {
        promises.push( new Promise( (resolve, reject) => {
            return sqlDb("books").where("isbn",b.book).select().then( data => {
              return sqlDb("carts").where("email",body.id).where("book",b.book).update({
                email : body.id,
                book : b.book,
                quantity: b.quantity,
                value : data[0].value,
                currency : data[0].currency
              });
            }).then(resolve("done"));
        }));
      });

      return Promise.all(promises).then( promises => {
        return sqlDb("carts").where("email",body.id).select().then( data => {
          return getCartHandler(body.id,data);
        });
      });
    });
  }//End of else
}


/**
 * Update my user profile
 *
 * body User My User updated
 * returns User
 **/
exports.putUsersMe = function(body) {
  if(!(body.password == "")){
    return sqlDb("users").where("email",body.email).update(body).then(
       data => {
         return sqlDb("users").where("email",body.email).select().then(
            data => {
              return data.map( e => {
                 delete e.password;
                 return e;
              });
            }).then( data => {return data[0];});
      });
  } else{
    return sqlDb("users").where("email",body.email).select().then( myUser => {
      body.password = myUser[0].password;
      return sqlDb("users").where("email",body.email).update(body).then(
         data => {
           return sqlDb("users").where("email",body.email).select().then(
              data => {
                return data.map( e => {
                   delete e.password;
                   return e;
                });
              }).then( data => {return data[0];});
        });
    });
  }
}
