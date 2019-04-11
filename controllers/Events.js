'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.getEvents = function getEvents (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Events.getEvents(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsById = function getEventsById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Events.getEventsById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsFindBy = function getEventsFindBy (req, res, next) {
  var attribute = req.swagger.params['attribute'].value;
  var key = req.swagger.params['key'].value;
  Events.getEventsFindBy(attribute,key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
