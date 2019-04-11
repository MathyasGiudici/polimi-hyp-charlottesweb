'use strict';


/**
 * Delete a specific review
 *
 * id String Id of the review to delete
 * returns String
 **/
exports.deleteReviewsById = function(id) {
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
 * Get all reviews
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getReviews = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
}, {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific review
 *
 * id String Id of the review to look for
 * returns Review
 **/
exports.getReviewsById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all reviews with a specific criterion
 *
 * attribute String Attribute to search on. For example: author(user), book, ... 
 * key String Key of the attribute for the search
 * returns List
 **/
exports.getReviewsFindBy = function(attribute,key) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
}, {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post a review
 *
 * body Review Review to add
 * returns List
 **/
exports.postReviews = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
}, {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific review
 *
 * id String Id of the review to modify
 * body Review Body of the review to modify
 * returns Review
 **/
exports.putReviewsById = function(id,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "userR001",
  "isbn" : "9788804666639",
  "userId" : "user@mail.polimi.it",
  "title" : "Need to be read",
  "description" : "Beautiful italin book.",
  "timestamp" : "2017-07-21T17:32:28Z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

