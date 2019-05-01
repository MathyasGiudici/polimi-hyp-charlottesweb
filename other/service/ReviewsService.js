'use strict';

let sqlDb;
let {giveMeData} = require("./fillings/ReviewsData")

exports.reviewsSetup = function(datatbase){
  console.log("DEBUG --> CREATING REVIEWS' TABLE");
  sqlDb = datatbase;
  sqlDb.schema.hasTable("reviews").then( exists => {
    if(!exists){
      sqlDb.schema.createTable("reviews", table => {
        table.string("id").primary();
        table.string("isbn");
        table.string("userId");
        table.string("title");
        table.text("description");
        table.datetime("timestamp");
      }).then(() => {
        console.log("DEBUG --> FILLING REVIEWS' TABLE");
        return Promise.all(giveMeData()).then(obj => {
          console.log("DEBUG --> FILLING REVIEWS' TABLE: ONE ENTRY");
          return sqlDb("reviews").insert(obj);
        });
      });
    }
    else {
      return true;
    }
  });
}


/**
 * Delete a specific review
 *
 * id String Id of the review to delete
 * returns String
 **/
exports.deleteReviewsById = function(id, email) {
  let parsedId = id.slice(1, isbn.length -1);
  return sqlDb("reviews").where("email",email).where("id",parsedId).del().then(function(e){
    return id;
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
  return sqlDb("reviews").limit(limit).offset(offset).select();

}


/**
 * Get a specific review
 *
 * id String Id of the review to look for
 * returns Review
 **/
exports.getReviewsById = function(id) {
  let parsedId = id.slice(1, isbn.length -1);
  return sqlDb("reviews").where("id",parsedId).select();
}


/**
 * Get all reviews with a specific criterion
 *
 * attribute String Attribute to search on. For example: author(user), book, ...
 * key String Key of the attribute for the search
 * returns List
 **/
exports.getReviewsFindBy = function(attribute,key) {
  return sqlDb("reviews").where(attribute, key).select();
}


/**
 * Post a review
 *
 * body Review Review to add
 * returns List
 **/
exports.postReviews = function(body) {
  parseEmail = body.email.replace(/[^a-zA-Z0-9]/g, "");
  body.id = parseEmail + Date.now().toString();
  return sqlDb("reviews").insert(body);
}


/**
 * Update a specific review
 *
 * id String Id of the review to modify
 * body Review Body of the review to modify
 * returns Review
 **/
exports.putReviewsById = function(id,body) {
  let parsedId = id.slice(1, isbn.length -1);
  return sqlDb("reviews").where("email", body.email).where("id",parsedId).update(body);
}
