'use strict';
/*eslint-disable require-jsdoc*/

const _ = require('underscore');
const path = process.cwd();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/users');
const BookModel = require('../models/book');
const LoanModel = require('../models/loan');

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
    .route('/changepassword')
    .post((req, res) => {
      let body = _.pick(req.body, ['email', 'newPassword']);
      bcrypt
        .hash(body.newPassword, 10)
        .then((hash) => {
          UserModel.update({
            email: body
              .email
              .trim()
              .toLowerCase()
          }, {
            password: hash
          }, (err, raw) => {
            if (err)
              console.error('Error patching password', err);
            }
          );
        })
        .then(() => {
          res.redirect(303, '/settings');
        })
        .catch((err) => {
          res
            .status(500)
            .send();
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
          let newBook = new BookModel({
            volumeInfo: JSON.stringify(book.volumeInfo),
            owner: _id
          });
          newBook.save();
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
      UserModel
        .findOne({_id})
        .then((user) => {
          let {title} = user.bookCollection[index].volumeInfo;
          user
            .bookCollection
            .splice(index, 1);
          user
            .save()
            .then((user) => {
              res
                .status(200)
                .send({bookCollection: user.bookCollection});

              return Promise.resolve(title);
            })
            .then((title) => {
              BookModel
                .find({owner: _id})
                .then((books) => {
                  return books.filter((book) => {
                    return JSON
                      .parse(book.volumeInfo)
                      .title === title;
                  });
                })
                .then((books) => {
                  BookModel
                    .find({owner: _id, volumeInfo: books[0].volumeInfo})
                    .remove()
                    .exec();
                })
                .catch(console.error);
            });
        })
        .catch((e) => {
          res
            .status(400)
            .send(e);
        });
    });

  app
    .route('/library')
    .get((req, res) => {
      BookModel
        .find({})
        .then((books) => {
          res
            .status(200)
            .send(books);
        })
        .catch(console.error);
    });

  app
    .route('/request')
    .get((req, res) => {
      let {user} = req.query;
      // console.log(user);
      Promise.all([
        LoanModel.find({owner: user}),
        LoanModel.find({borrower: user}),
      ]).then((loans) => {
        res.status(200).send(loans);
      })
      .catch(console.error);
    })
    .post((req, res) => {
      const borrower = req.body._id;
      const book = req.body.book._id;
      const {owner} = req.body.book;
      // console.log(req.body);
      LoanModel
        .findOne({book})
        .then((loan) => {
          if (!loan) {
            loan = new LoanModel({borrower, owner, book, status: 'Pending'});
            loan
              .save()
              .then((loan) => {
                res
                  .status(200)
                  .send(loan);
              });
          } else {
            res
              .status(409)
              .send();
          }
        })
        .catch(console.error);
    })
    .delete((req, res) => {
      const borrower = req.body._id;
      const book = req.body.book._id;
      const {owner} = req.body.book;
      // console.log(borrower, book, owner);
      try {
        LoanModel.findOne({book}).remove().exec().then(() => {
          res.status(200).send({});
        });
      } catch (error) {
        console.error(error);
      }
    });
};
