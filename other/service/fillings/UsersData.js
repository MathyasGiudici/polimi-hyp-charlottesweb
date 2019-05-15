'use strict';

exports.giveMeData = function() {
  return [
    {
      email: "admin@polimi-hyp-charlottesweb.herokuapp.com",
      firstName: "Admin",
      lastName: "Admin",
      password: "ITSonlyAtestYOUdontHAVEsecretPOWER",
      gender: "female",
      birthDay: "1900-01-01",
      userType: "admin"
    },
    {
      email: "mario.rossi@mail.polimi.it",
      firstName: "Mario",
      lastName: "Rossi",
      password: "superSECRETEpassword",
      gender: "male",
      birthDay: "1990-07-21",
      userType: "user"
    },
    {
      email: "laura.gatti@mail.polimi.it",
      firstName: "Laura",
      lastName: "Gatti",
      password: "superSECRETEpassword123",
      gender: "female",
      birthDay: "1994-05-30",
      userType: "user"
    }
  ];
}

exports.giveMeCartData = function() {
  return [
    {
      email: "mario.rossi@mail.polimi.it",
      book: "9780300039504",
      quantity: 1,
      value : 10.03,
      currency : "euro"
    }
  ];
}
