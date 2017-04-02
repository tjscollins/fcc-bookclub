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
    .route('/profile')
    .get((req, res) => {
      const _id = req.query.id;
      // console.log(_id);
      UserModel
        .findOne({_id})
        .then((user) => {
          const {profile} = user;
          res
            .status(200)
            .send({profile});
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    })
    .post((req, res) => {
      const {_id, name, city, state} = req.body;
      UserModel
        .findOne({_id})
        .then((user) => {
          user.profile = {
            name,
            city,
            state
          };
          user
            .save()
            .then(({profile}) => {
              res
                .status(200)
                .send(profile);
            });
        })
        .catch((err) => {
          res
            .status(400)
            .send(err);
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
    .route('/mybooks')
    .get(sendIndex);
  app
    .route('/booklist')
    .get(sendIndex);
  app
    .route('/settings')
    .get(sendIndex);

  app
    .route('/mybooklist')
    .get((req, res) => {
      const _id = req.query.id;
      // console.log(_id);
      UserModel
        .findOne({_id})
        .then((user) => {
          const {bookCollection} = user;
          res
            .status(200)
            .send({bookCollection});
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    })
    .post((req, res) => {
      const {_id, book} = req.body;
      // console.log('POST /mybooklist', _id, book);
      UserModel
        .findOne({_id})
        .then((user) => {
          return user.addBook(book);
        })
        .then((book) => {
          res
            .status(200)
            .send(book);
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    })
    .delete((req, res) => {
      const {_id, index} = req.body;
      console.log(_id, index);
      UserModel
        .findOne({_id})
        .then((user) => {
          console.log(user);
          user
            .bookCollection
            .splice(index, 1);
          user
            .save()
            .then((user) => {
              res
                .status(200)
                .send({bookCollection: user.bookCollection});
            });
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    });
};
