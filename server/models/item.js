'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('../database/index').Database;

const ItemSchema = new Schema({
  title        : { type: String, trim:  true, require: true},
  created_by   : { type: String, require: true, index: true},
  is_done   : { type: Boolean, default: false},
},{ timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' }});

exports.Item = mongoose.model('items', ItemSchema,'items')
