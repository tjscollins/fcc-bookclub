'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const {ObjectID} = require('mongodb');
const Schema = mongoose.Schema;

const Book = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  volumeInfo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', Book);
