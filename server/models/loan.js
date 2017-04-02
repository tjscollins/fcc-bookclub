'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const {ObjectID} = require('mongodb');
const Schema = mongoose.Schema;

const Loan = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  borrower: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('Loan', Loan);
