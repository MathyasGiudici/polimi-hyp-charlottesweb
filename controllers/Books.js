'use strict';

var utils = require('../utils/writer.js');
var Books = require('../service/BooksService');

module.exports.getBooks = function getBooks (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Books.getBooks(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooksByIsbn = function getBooksByIsbn (req, res, next) {
  var isbn = req.swagger.params['isbn'].value;
  Books.getBooksByIsbn(isbn)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooksFindBy = function getBooksFindBy (req, res, next) {
  var attribute = req.swagger.params['attribute'].value;
  var key = req.swagger.params['key'].value;
  Books.getBooksFindBy(attribute,key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSimilarBooksByIsbn = function getSimilarBooksByIsbn (req, res, next) {
  var isbn = req.swagger.params['isbn'].value;
  Books.getSimilarBooksByIsbn(isbn)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
