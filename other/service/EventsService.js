'use strict';

let sqlDb;
let {giveMeData, giveMeAuthors} = require("./fillings/EventsData")

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
             return Promise.all(giveMeAuthors()).then( obj => {
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

let eventMapping = function (obj){
  //Looking for authors
  let authors = [];
  sqlDb("events_authors").where("event",obj.event).select().then(
     data => {
       return data.forEach( e => {
         authors.push(e.author1);
         if(e.author2)
          authors.push(e.author2);
         if(e.author3)
          authors.push(e.author3);
         if(e.author4)
          authors.push(e.author4);
       });
     });

  obj.authors = authors;

  return obj;
}


/**
 * Get all events
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500 (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit) {
  return sqlDb("events").limit(limit).offset(offset).select().then( data => {
    return data.map( obj => {
      return eventMapping(obj);
    });
  });
}

/**
 * Get a specific event
 *
 * id String Id of the event to look for
 * returns Event
 **/
exports.getEventsById = function(id) {
  return sqlDb("events").where("id",id).select().then( data => {
    return data.map( obj => {
      return eventMapping(obj);
    });
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
  return sqlDb("events").where(attribute, key).select().then( data => {
    return data.map( obj => {
      return eventMapping(obj);
    });
  });
}
