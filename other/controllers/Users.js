'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.deleteUsersMe = function deleteUsersMe (req, res, next) {
  if(!(req.session.isLoggedIn)){
    return utils.unauthorizeAction(res);
  }

  Users.deleteUsersMe(req.session.email,req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCart = function getCart (req, res, next) {
  if(!(req.session.isLoggedIn)){
    return utils.unauthorizeAction(res);
  }

  Users.getCart(req.session.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersMe = function getUsersMe (req, res, next) {
  if(!(req.session.isLoggedIn)){
    return utils.unauthorizeAction(res);
  }

  Users.getUsersMe(req.session.email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersLogin = function postUsersLogin (req, res, next) {
  var email = req.swagger.params['email'].value;
  var password = req.swagger.params['password'].value;

  Users.postUsersLogin(email,password,req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersLogout = function postUsersLogout (req, res, next) {
  req.session.isLoggedIn = false;
  req.session.email = " ";
  utils.writeJson(res, {response: "Successful logout"});
};

module.exports.postUsersRegister = function postUsersRegister (req, res, next) {
  var body = req.swagger.params['body'].value;

  Users.postUsersRegister(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putCart = function putCart (req, res, next) {
  var body = req.swagger.params['body'].value;

  if(req.session.isLoggedIn && req.session.email == body.id){
    Users.putCart(body)
      .then(function (response) {
        Users.getCart(req.session.email)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.unauthorizeAction(res);
  }
};

module.exports.putUsersMe = function putUsersMe (req, res, next) {
  var body = req.swagger.params['body'].value;

  if(req.session.isLoggedIn && req.session.email == body.email){
    Users.putUsersMe(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  } else {
    utils.unauthorizeAction(res);
  }
};
