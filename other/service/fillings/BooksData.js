'use strict';

exports.giveMeData = function() {
  return [
    {
      isbn : "9788804666639",
      title : "La solitudine dei numeri primi",
      description : "La solitudine dei numeri primi description",
      interview : "Il primo best seller sulla matematica",
      numOfPages : 266,
      //author : "authorA001",
      photo : "",
      type : "paper",
      pubbDate : "2016-5-26",
      genre : "romance",
      theme : "love",
      //similarTo : [ "9788867024766", "9788804606246" ],
      status : "available",
      ourFavorite : false,
      bestSelling : true,
      value : 14.00,
      currency : "euro"
    },
  ];
}

exports.giveMeSimilars = function() {
  return [
    {
      isbn1: "",
      isbn2: ""
    }
  ];
}

exports.giveMeAuthors = function() {
  return [
    {
      isbn: "",
      author1: "",
      author2: "",
      author3: "",
      author4: ""
    }
  ];
}
