'use strict';


/**
 * Get all authors
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getAuthors = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "authorA001",
  "name" : "Fred",
  "surname" : "Vargas",
  "bio" : " pseudonym of Frédérique Audoin-Rouzeau"
}, {
  "id" : "authorA001",
  "name" : "Fred",
  "surname" : "Vargas",
  "bio" : " pseudonym of Frédérique Audoin-Rouzeau"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific author
 *
 * id String Id of the author to look for
 * returns Author
 **/
exports.getAuthorsById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "authorA001",
  "name" : "Fred",
  "surname" : "Vargas",
  "bio" : " pseudonym of Frédérique Audoin-Rouzeau"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

