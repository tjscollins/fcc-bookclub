'use strict';
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {ObjectID} = require('mongodb');
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  bookCollection: {
    type: Array
  },
  bookRequests: {
    type: Array
  }
});

User.methods.addBook = function(book) {
  let user = this;
  user
    .bookCollection
    .push(book);
  return user
    .save()
    .then(() => {
      return book;
    });
};

User.methods.toJSON = function() {
  return _.pick(this.toObject(), ['_id', 'email']);
};

User.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user
      ._id
      .toHexString(),
    access
  }, 'abc123');
  user.tokens = user
    .tokens
    .filter((jwt) => {
      // Only keep tokens that are less than 1 day old.  Purge older tokens.
      return Date.now() - jwt
        .date
        .valueOf() < 86400000;
    });
  user
    .tokens
    .push({access, token});
  return user
    .save()
    .then(() => {
      return token;
    });
};

User.methods.removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

User.methods.changePassword = function(password) {
  let user = this;

  // console.log('Setting password', password);
  return user.update({
    $set: {
      password: password
    }
  });
};

User.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({'_id': decoded._id, 'tokens.token': token, 'tokens.access': 'auth'});
};

User.statics.findByCredentials = function(email, password) {
  let User = this;

  return User
    .findOne({email})
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
};

User.statics.resetPassword = function(email) {
  const User = this;
  return User
    .findOne({email})
    .then((user) => {
      // console.log('Tried to find', user);
      if (!user) {
        return Promise.reject();
      }
      let time = new Date().getTime();
      let reqID = new ObjectID();
      let _id = user._id;

      // console.log('Running hash algo');
      return new Promise((resolve, reject) => {
        bcrypt.hash(reqID.toHexString(), 10).then((hash) => {
          // console.log('Hashed reqID', hash);
          User.update({
            email
          }, {
            $push: {
              resetRequests: {
                reqID: hash,
                time,
                _id
              }
            }
          }).then((res) => {
            // console.log('Success', res);
          }, (er) => {
            // console.log('Fail', er);
          });
          resolve(reqID);
        }, (err) => {
          console.log('Error hashing reqId', err);
        });
      });
    });
};

User.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', User);
