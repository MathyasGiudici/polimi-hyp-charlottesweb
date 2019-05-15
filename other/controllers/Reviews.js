'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

module.exports.deleteReviewsById = function deleteReviewsById (req, res, next) {
  var id = req.swagger.params['id'].value;

  if(!(req.session.isLoggedIn)){
    return utils.unauthorizeAction(res);
  }

  Reviews.deleteReviewsById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviews = function getReviews (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Reviews.getReviews(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsById = function getReviewsById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Reviews.getReviewsById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsFindBy = function getReviewsFindBy (req, res, next) {
  var attribute = req.swagger.params['attribute'].value;
  var key = req.swagger.params['key'].value;
  Reviews.getReviewsFindBy(attribute,key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postReviews = function postReviews (req, res, next) {
  var body = req.swagger.params['body'].value;

  if(req.session.isLoggedIn && req.session.email == body.userId){
    Reviews.postReviews(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    } else {
      utils.unauthorizeAction(res);
    }
};

module.exports.putReviewsById = function putReviewsById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;

  if(req.session.isLoggedIn && req.session.email == body.userId){
    Reviews.putReviewsById(id,body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
   } else {
     utils.unauthorizeAction(res);
   }
};
