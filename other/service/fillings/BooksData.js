'use strict';

exports.giveMeData = function() {
  return [
    {
      isbn : "9780061124952",
      title : "Charlotte's Web",
      description : "Wilbur the pig's life has already been saved by Fern, but when he is sold to her uncle he realises his life is in even more danger. Enter Charlotte A. Cavatica, a beautiful large grey spider. Charlotte is determined to keep Wilbur from the chopping block, and comes up with an ingenious way to do just that. Charlotte's Web is a classic tale of friendship, bravery and some animal magic.",
      interview : "Don’t miss one of America’s top 100 most-loved novels, selected by PBS’s The Great American Read",
      numOfPages : 272,
      //author : "authorA001",
      photo : "",
      type : "paper",
      pubbDate : "2012-4-10",
      genre : "kids",
      theme : "friendship",
      //similarTo : [ "9788867024766", "9788804606246" ],
      status : "available",
      ourFavorite : true,
      bestSelling : true,
      value : 8.04,
      currency : "euro"
    },
    {
      isbn : "9780156012195",
      title : "The Little Prince",
      description : "Having crash-landed in the Sahara desert, a pilot comes across a young boy who introduces himself as the Little Prince and tells him the story of how he grew up on a tiny asteroid before travelling across the galaxies and coming to Earth. His encounters and discoveries, seen through childlike, innocent eyes, give rise to candid reflections on life and human nature. First published in 1943 and featuring the author's own watercolour illustrations, The Little Prince has since become a classic philosophical fable for young and old, as well as a global publishing phenomenon, selling tens of millions of copies worldwide and being translated into dozens of languages.",
      interview : "One of the most-translated books in the world and was voted the best book of the 20th century in France",
      numOfPages : 112,
      //author : "authorA001",
      photo : "",
      type : "paper",
      pubbDate : "2000-5-15",
      genre : "kids",
      theme : "friendship",
      //similarTo : [ "9788867024766", "9788804606246" ],
      status : "available",
      ourFavorite : true,
      bestSelling : true,
      value : 14.00,
      currency : "euro"
    },
    {
      isbn : "9780120420476",
      title : "Good Night Stories for Rebel Girls",
      description : " What if the princess didn't marry Prince Charming but instead went on to be an astronaut? What if the jealous step sisters were supportive and kind? And what if the queen was the one really in charge of the kingdom? Illustrated by sixty female artists from every corner of the globe, Good Night Stories for Rebel Girls introduces us to one hundred remarkable women and their extraordinary lives, from Ada Lovelace to Malala, Amelia Earhart to Michelle Obama. Empowering, moving and inspirational, these are true fairy tales for heroines who definitely don't need rescuing.",
      interview : "'The definitive book of the year in our house, for both parents and offspring' Maggie O'Farrell, Guardian Books of the Year",
      numOfPages : 224,
      //author : "authorA001",
      photo : "",
      type : "paper",
      pubbDate : "2017-3-2",
      genre : "kids",
      theme : "equality",
      //similarTo : [ "9788867024766", "9788804606246" ],
      status : "available",
      ourFavorite : false,
      bestSelling : true,
      value : 19.55,
      currency : "euro"
    },
    {
      isbn : "9781538728529",
      title : "Every Breath",
      description : "Hope Anderson is at a crossroads. At thirty-six, she's been dating her boyfriend, an orthopedic surgeon, for six years. With no wedding plans in sight, and her father recently diagnosed with ALS, she decides to use a week at her family's cottage in Sunset Beach, North Carolina, to ready the house for sale and mull over some difficult decisions about her future.Tru Walls has never visited North Carolina but is summoned to Sunset Beach by a letter from a man claiming to be his father. A safari guide, born and raised in Zimbabwe, Tru hopes to unravel some of the mysteries surrounding his mother's early life and recapture memories lost with her death. When the two strangers cross paths, their connection is as electric as it is unfathomable, but in the immersive days that follow, their feelings for each other will give way to choices that pit family duty against personal happiness in devastating ways.",
      interview : "#1 New York Times bestselling author Nicholas Sparks",
      numOfPages : 320,
      //author : "authorA001",
      photo : "",
      type : "paper",
      pubbDate : "2018-16-10",
      genre : "romance",
      theme : "love",
      //similarTo : [ "9788867024766", "9788804606246" ],
      status : "available",
      ourFavorite : false,
      bestSelling : true,
      value : 18.56,
      currency : "euro"
    }
  ];
}

exports.giveMeSimilars = function() {
  return [
    {
      isbn1: "9780061124952",
      isbn2: "9780156012195"
    },
    { //symmetric relation
      isbn2: "9780061124952", 
      isbn1: "9780156012195"
    },
    {
      isbn1: "9780061124952",
      isbn2: "9780120420476"
    },
    { //symmetric relation
      isbn2: "9780061124952",
      isbn1: "9780120420476"
    },
    {
      isbn1: "9780061124952",
      isbn2: "9780120420476"
    },
    { //symmetric relation
      isbn2: "9780061124952",
      isbn1: "9780120420476"
    }
  ];
}

exports.giveMeAuthors = function() {
  return [
    {
      isbn: "9780061124952",
      author1: "E.B. White",
      author2: "",
      author3: "",
      author4: ""
    },
    {
      isbn: "9780156012195",
      author1: "Antoine de Saint-Exupéry",
      author2: "",
      author3: "",
      author4: ""
    },
    {
      isbn: "9780120420476",
      author1: "Francesca Cavallo",
      author2: "Elena Favilli",
      author3: "",
      author4: ""
    },
     {
      isbn: "9781538728529",
      author1: "Nicholas Sparks",
      author2: "",
      author3: "",
      author4: ""
    }
  ];
}
