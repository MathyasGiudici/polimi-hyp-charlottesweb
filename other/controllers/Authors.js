'use strict';

var utils = require('../utils/writer.js');
var Authors = require('../service/AuthorsService');

module.exports.getAuthors = function getAuthors (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Authors.getAuthors(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorsById = function getAuthorsById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Authors.getAuthorsById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
