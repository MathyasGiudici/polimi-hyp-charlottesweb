'use strict';


/**
 * Get all events
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "EVENT001",
  "book" : "9788804666639",
  "author" : [ "AUTH112467" ],
  "place" : "Aula De Donato @Polimi",
  "timestamp" : "2019-10-01T10:30:00"
}, {
  "id" : "EVENT001",
  "book" : "9788804666639",
  "author" : [ "AUTH112467" ],
  "place" : "Aula De Donato @Polimi",
  "timestamp" : "2019-10-01T10:30:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific event
 *
 * id String Id of the event to look for
 * returns Event
 **/
exports.getEventsById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "EVENT001",
  "book" : "9788804666639",
  "author" : [ "AUTH112467" ],
  "place" : "Aula De Donato @Polimi",
  "timestamp" : "2019-10-01T10:30:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all events with a specific criterion
 *
 * attribute String Attribute to search on. For example: author, book, date, ... 
 * key String Key of the attribute for the search
 * returns List
 **/
exports.getEventsFindBy = function(attribute,key) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "EVENT001",
  "book" : "9788804666639",
  "author" : [ "AUTH112467" ],
  "place" : "Aula De Donato @Polimi",
  "timestamp" : "2019-10-01T10:30:00"
}, {
  "id" : "EVENT001",
  "book" : "9788804666639",
  "author" : [ "AUTH112467" ],
  "place" : "Aula De Donato @Polimi",
  "timestamp" : "2019-10-01T10:30:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

