'use strict'
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { ActionManager } = require('../actions/action-manager');
const { CreateUser } = require("../actions/users/create-user");
const { RegisterUser } = require("../actions/users/register-user");
const { LoginUser } = require("../actions/users/login-user");

const createUserBodySchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
})

const registerUserBodySchema = Joi.object({
  invite_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
  password: Joi.string().min(8).required()
})

const loginUserBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
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

router.post('/registration', validator.body(registerUserBodySchema), function(req, res, next) {
  const { invite_id, password } = req.body;
  let action = new RegisterUser({ invite_id, password});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

router.post('/login', validator.body(loginUserBodySchema), function(req, res, next) {
  const { email, password } = req.body;
  let action = new LoginUser({ email, password});
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

module.exports = router;
