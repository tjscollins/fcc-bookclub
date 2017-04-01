'use strict';
/*eslint-disable require-jsdoc*/

const _ = require('underscore');
const path = process.cwd();

const UserModel = require('../models/users');

const sendIndex = (req, res) => {
  res.sendFile(`${path}/public/index.html`);
};

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app
    .route('/')
    .get(sendIndex);

  app
    .route('/login')
    .get(sendIndex)
    .post((req, res) => {
      /**
       * Login w/ provided credentials
       */
       /**
       * Login with provided user credentials
       */
       let body = _.pick(req.body, ['email', 'password']);

       UserModel.findByCredentials(body.email.trim().toLowerCase(), body.password).then((user) => {
         return user
           .generateAuthToken()
           .then((token) => {
             res
               .header('x-auth', token)
               .send(user);
           });
       }).catch((e) => {
         res
           .status(400)
           .send();
       });
    });

  app
    .route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app
    .route('/register')
    .get(sendIndex)
    .post((req, res) => {
      /**
       * Create a new user account
       */
      let body = _.pick(req.body, ['email', 'password']);
      body.email = body
        .email
        .trim()
        .toLowerCase();
      let user = new UserModel(body);
      user
        .save()
        .then(() => {
          return user.generateAuthToken();
        })
        .then((token) => {
          res
            .header('x-auth', token)
            .send(user);
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    });

  app
    .route('/api/me')
    .get(isLoggedIn,
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    function(req, res) {
      res.json(req.user.github);
    });

  app
    .route('/auth/github')
    .get(passport.authenticate('github'));

  app
    .route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
};
