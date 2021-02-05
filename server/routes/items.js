'use strict'
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authenticate = require('../util/authentication');
const { ActionManager } = require('../actions/action-manager');
const { CreateItem } = require("../actions/items/create-item");
const { GetItem } = require("../actions/items/get-item");
const { UpdateItem } = require("../actions/items/update-item");
const { DeleteItem } = require("../actions/items/delete-item");

const createItemBodySchema = Joi.object({
  title: Joi.string().min(3).required(),
})

const updateItemBodySchema = Joi.object({
  title: Joi.string().min(3),
  is_done: Joi.boolean(),
}).min(1);

router.post('/', authenticate, validator.body(createItemBodySchema), function(req, res, next) {
  const { title } = req.body;
  const { user_id } = req.query;
  let action = new CreateItem({ title, user_id});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

router.get('/:item_id?', authenticate, function(req, res, next) {
  const item_id  = req.params.item_id;
  const user_id  = req.query.user_id;
  let action = new GetItem({ item_id, user_id});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

router.patch('/:item_id', authenticate, validator.body(updateItemBodySchema), function(req, res, next) {
  const item_id  = req.params.item_id;
  const user_id  = req.query.user_id;
  const update_obj  = req.body;
  let action = new UpdateItem({ item_id, user_id, update_obj} );
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

router.delete('/:item_id', authenticate, function(req, res, next) {
  const item_id  = req.params.item_id;
  const user_id  = req.query.user_id;
  let action = new DeleteItem({ item_id, user_id} );
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

module.exports = router;
