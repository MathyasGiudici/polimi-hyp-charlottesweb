'use strict';

exports.giveMeData = function() {
  return [
    {
      id: "event001",
      title: "Meet the author: Francesca and Elena",
      book: "9780120420476",
      place: "Mondadori Megastore, P.zza Duomo 1, Milan, Italy",
      timestamp: "2019-06-13T16:30:00Z"
    },
    {
      id: "event002",
      title: "Elena Favilli from Arezzo to LA",
      book: "9780120420476",
      place: "Mondadori Bookstore, Via d\'Azeglio 34, Bologna, Italy",
      timestamp: "2019-06-16T10:00:00Z"
    },
    {
      id: "event003",
      title: "Nicholas Sparks: Every Breath",
      book: "9781538728529",
      place: "Book Culture, 450 Columbus Avenue, New York, United States",
      timestamp: "2019-07-07T21:00:00Z"
    }
  ];
}


exports.giveMeAuthors = function() {
  return [
    {
      event: "event001",
      author1: "author003",
      author2: "author004",
      author3: "",
      author4: ""
    },
    {
      event: "event002",
      author1: "author004",
      author2: "",
      author3: "",
      author4: ""
    },
    {
      event: "event003",
      author1: "author005",
      author2: "",
      author3: "",
      author4: ""
    }
  ];
}
