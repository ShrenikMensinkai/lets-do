'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('../database/index').Database;

const InviteSchema = new Schema({
  email       : { type: String, unique: true, require: true, index: true},
  },{ timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' }});
  
  InviteSchema.index({created_at: 1},{expireAfterSeconds: 3600});

exports.Invite = mongoose.model('invites', InviteSchema,'invites')
