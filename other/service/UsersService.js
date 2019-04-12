'use strict';


/**
 * Delete my user
 *
 * returns String
 **/
exports.deleteUsersMe = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get my user's cart
 *
 * returns Cart
 **/
exports.getCart = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "user@mail.polimi.it",
  "total" : {
    "value" : "14,00",
    "currency" : "euro"
  },
  "books" : [ "9788867024766", "9788804606246" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get my user
 *
 * returns User
 **/
exports.getUsersMe = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "user@mail.polimi.it",
  "firstName" : "Mario",
  "lastName" : "Rossi",
  "password" : "1234",
  "gender" : "female",
  "birthDay" : "1990-07-21",
  "userType" : "user"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logout
 *
 * no response value expected for this operation
 **/
exports.postUsersLogout = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Register into the store
 *
 * body User User to sign-up
 * returns List
 **/
exports.postUsersRegister = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "email" : "user@mail.polimi.it",
  "firstName" : "Mario",
  "lastName" : "Rossi",
  "password" : "1234",
  "gender" : "female",
  "birthDay" : "1990-07-21",
  "userType" : "user"
}, {
  "email" : "user@mail.polimi.it",
  "firstName" : "Mario",
  "lastName" : "Rossi",
  "password" : "1234",
  "gender" : "female",
  "birthDay" : "1990-07-21",
  "userType" : "user"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update my user's cart
 *
 * body Cart Updated Cart of my User
 * returns Cart
 **/
exports.putCart = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "user@mail.polimi.it",
  "total" : {
    "value" : "14,00",
    "currency" : "euro"
  },
  "books" : [ "9788867024766", "9788804606246" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update my user profile
 *
 * body User My User updated
 * returns User
 **/
exports.putUsersMe = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "user@mail.polimi.it",
  "firstName" : "Mario",
  "lastName" : "Rossi",
  "password" : "1234",
  "gender" : "female",
  "birthDay" : "1990-07-21",
  "userType" : "user"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

