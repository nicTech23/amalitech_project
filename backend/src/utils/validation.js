const { body, validationResult } = require('express-validator');


const register_validation = [
  // Validate name field
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  // Validate email field
  body('email').isEmail().withMessage('Please provide a valid email address'),
];


module.exports = {register_validation}