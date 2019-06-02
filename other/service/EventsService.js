'use strict';

let sqlDb;
let {giveMeData} = require("./fillings/EventsData")

exports.eventsSetup = function(datatbase){
  console.log("DEBUG --> CREATING EVENTS' TABLE");
  sqlDb = datatbase;
  sqlDb.schema.hasTable("events").then( exists => {
    if(!exists){
      sqlDb.schema.createTable("events", table => {
        table.string("id").primary();
        table.string("author1");
        table.string("author2");
        table.string("author3");
        table.string("author4");
        table.string("title");
        table.string("book");
        table.string("place");
        table.datetime("timestamp");
        table.text("photo");
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

let eventMapping = function (obj){

  //Creating authors' array of ids
  obj.authorsIDs = [];

  obj.authorsIDs.push(obj.author1);
  if(obj.author2)
    obj.authorsIDs.push(obj.author2);

  if(obj.author3)
    obj.authorsIDs.push(obj.author3);

  if(obj.author4)
    obj.authorsIDs.push(obj.author4);

  delete obj.author1;
  delete obj.author2;
  delete obj.author3;
  delete obj.author4;

  return obj;
}

let eventUpdating = function(container){
  let events = container.events;

  events.forEach ( e => {
    //Inits
    e.authors = [];

    //Authors linking
    container.authors.forEach( a => {
      e.authorsIDs.forEach( i => {
        if (i == a.id)
          e.authors.push(a);
      });
    });

    delete e.authorsIDs;
  });

  return events;
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
  }).then( events => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      let container = {};
      container.events = events;
      container.authors = authors;
      return container;
    });
  }).then( container => {
    return eventUpdating(container);
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
  }).then( events => {
    //Retreving authors
    return sqlDb("authors").select().then( authors => {
      let container = {};
      container.events = events;
      container.authors = authors;
      return container;
    });
  }).then( container => {
    return eventUpdating(container);
  }).then( data => { return data[0];});
}

/**
 * Get all events with a specific criterion
 *
 * attribute String Attribute to search on. For example: author, book, date, ...
 * key String Key of the attribute for the search
 * returns List
 **/
 exports.getEventsFindBy = function(attribute,key) {
   if(attribute != 'author') {
     return sqlDb("events").where(attribute, key).select().then( data => {
       return data.map( obj => {
         return eventMapping(obj);
       });
     }).then( events => {
       //Retreving authors
       return sqlDb("authors").select().then( authors => {
         let container = {};
         container.events = events;
         container.authors = authors;
         return container;
       });
     }).then( container => {
       return eventUpdating(container);
     });
   } else{
     return sqlDb("events").where("author1",key).select().then( data1 => {
       return sqlDb("events").where("author2",key).select().then( data2 => {
         return sqlDb("events").where("author3",key).select().then( data3 => {
           return sqlDb("events").where("author4",key).select().then( data4 => {
             let final = data1.concat(data2).concat(data3).concat(data4);
             return final;
           });
         });
       });
     }).then( data => {
       return data.map( obj => {
         return eventMapping(obj);
       });
     }).then( events => {
       //Retreving authors
       return sqlDb("authors").select().then( authors => {
         let container = {};
         container.events = events;
         container.authors = authors;
         return container;
       });
     }).then( container => {
       return eventUpdating(container);
     });
   }
 }
