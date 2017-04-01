'use strict';

const {ObjectID} = require('mongodb');
const UserModel = require('./../../server/models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const userThreeID = new ObjectID();
const hashID = bcrypt.hashSync('585b6cd587dd7e1b8323d8d7', bcrypt.genSaltSync(10));

const users = [
  {
    _id: userOneID,
    email: 'tjscollins@gmail.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({
          _id: userOneID,
          access: 'auth'
        }, 'abc123').toString(),
        date: Date.parse('Dec 15, 2000'),
      },
      {
        access: 'auth',
        token: jwt.sign({
          _id: userOneID,
          access: 'auth'
        }, 'abc123').toString(),
        date: Date.parse('Dec 15, 1999'),
      },
      {
        access: 'auth',
        token: jwt.sign({
          _id: userOneID,
          access: 'auth'
        }, 'abc123').toString(),
        date: Date.parse('Dec 15, 1999'),
      }
    ]
  },
  {
    _id: userTwoID,
    email: 'ria@example.com',
    password: 'userTwoPass'
  }, {
    _id: userThreeID,
    email: 'test@test.test',
    password: 'testingtest',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({
          _id: userThreeID,
          access: 'auth'
        }, 'abc123').toString()
      }
    ],
    resetRequests: [
      {
        _id: userThreeID,
        time: new Date().getTime(),
        reqID: hashID
      }
    ]
  }
];

const populateServer = (done) => {
  // UserModel.remove({}).then(() => {
  //   return UserModel.insertMany(users);
  // });
  done();
};

const populateUsers = (done) => {
  UserModel
    .remove({})
    .then(() => {
      let userOne = new UserModel(users[0]).save();
      let userTwo = new UserModel(users[1]).save();
      let userThree = new UserModel(users[2]).save();

      return Promise.all([userOne, userTwo, userThree]);
    })
    .then(() => done());
};

module.exports = {
  users, populateServer, populateUsers
};
