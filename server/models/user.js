'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('../database/index').Database;

const UserSchema = new Schema({
  name        : { type: String, trim:  true, require: true},
  email       : { type: String, unique: true, require: true, index: true},
  password    : { type: String, trime: true, require: true},
  is_active   : { type: Boolean, default: false},
},{ timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' }});

exports.User = mongoose.model('users', UserSchema,'users')
