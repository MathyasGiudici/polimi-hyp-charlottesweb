'use strict';

let sqlDb = 0;
let {dataEvents} = require("./fillings/eventData")

exports.eventSetup = function(datatbase){
  sqlDb = datatbase;
  sqlDb.schema.hasTable("events").then( exists => {
    if(!exists){
      sqlDb.schema.createTable("events", table => {
        table.string("id").primary();
        table.string("book");
        table.string("author");
        table.string("place");
        table.string("timestamp");
      }).then(() => {
        return Promise.all(dataEvents()).then(obj => {
          return sqlDb("events").insert(obj);
        });
      });
    }
    else {
      return true;
    } 

  });
}

/**
 * Get all events
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit) {
  return sqlDb("events").limit(limit).offset(offset).select();
}

/**
 * Get a specific event
 *
 * id String Id of the event to look for
 * returns Event
 **/
exports.getEventsById = function(id) {
  let parsedId = id.slice(1, id.length -1);
  return sqlDb("events").where("id",parsedId).select();
}


/**
 * Get all events with a specific criterion
 *
 * attribute String Attribute to search on. For example: author, book, date, ... 
 * key String Key of the attribute for the search
 * returns List
 **/
exports.getEventsFindBy = function(attribute,key) {
  return sqlDb("events").where(attribute, key).select();
}

