'use strict'
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { ActionManager } = require('../actions/action-manager');
const { CreateUser } = require("../actions/users/create-user");
const { RegisterUser } = require("../actions/users/register-user");

const createUserBodySchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
})

const registerUserBodySchema = Joi.object({
  invite_id: Joi.string().min(8).required(),
  password: Joi.string().required()
})

router.post('/', validator.body(createUserBodySchema), function(req, res, next) {
  const { name, email} = req.body;
  let action = new CreateUser({ name, email});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

router.post('/register', validator.body(registerUserBodySchema), function(req, res, next) {
  const {  invite_id, password} = req.body;
  let action = new RegisterUser({ invite_id, password});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

module.exports = router;
