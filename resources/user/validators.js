"use strict";

const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('user_name').exists().withMessage('user_name is required field!'),
    body('user_email').exists().withMessage('user_email is required feild!'),
    body('user_email').isEmail().withMessage('invalid user_email!'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({  
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}

