'use strict';

let sqlDb = 0;
let {giveMeData, giveMeAuthor} = require("./fillings/EventsData")

exports.eventsSetup = function(datatbase){
  console.log("DEBUG --> CREATING EVENTS' TABLE");
  sqlDb = datatbase;
  sqlDb.schema.hasTable("events").then( exists => {
    if(!exists){
      sqlDb.schema.createTable("events", table => {
        table.string("id").primary();
        table.string("title");
        table.string("book");
        table.string("place");
        table.datetime("timestamp");
        table.binary("photo");
      }).then(() => {
        console.log("DEBUG --> FILLING EVENTS' TABLE");
        return Promise.all(giveMeData()).then(obj => {
          console.log("DEBUG --> FILLING EVENTS' TABLE: ONE ENTRY");
          return sqlDb("events").insert(obj);
        });
      });
    }
    else {
      return true;
    }

  });
}

exports.events_authorsSetup = function(database){
    console.log("DEBUG --> CREATING EVENTS_AUTHORS' TABLE");
    sqlDb = database;
    sqlDb.schema.hasTable("events_authors").then( exists => {
        if(!exists){
            sqlDb.schema.createTable("events_authors", table => {
                table.string("event");
                table.string("author1");
                table.string("author2");
                table.string("author3");
                table.string("author4");
                table.unique(["event","author1"]);
            }).then( () => {
             console.log("DEBUG --> FILLING EVENTS_AUTHORS' TABLE");
             return Promise.all(giveMeAuthor()).then( obj => {
               console.log("DEBUG --> FILLING EVENTS_AUTHORS' TABLE: ONE ENTRY");
               return sqlDb("events_authors").insert(obj);
             });
            });
        }
        else{
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
