const { body, validationResult } = require('express-validator');


const register_validation = [
  // Validate name field
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  // Validate email field
  body('email').isEmail().withMessage('Please provide a valid email address').trim(),
  body("first_name").notEmpty().withMessage("Provide first name").trim(),
  body("last_name").notEmpty().withMessage("Provide last name").trim(),
  body("telephone").notEmpty().withMessage("Provide telephone number").trim()
];

const message_validation = [
  body("recipient").notEmpty().withMessage("Provide recipient").trim().isEmail().withMessage('Please provide a valid email address'),
  body("subject").notEmpty().withMessage("Provide subject").trim(),
  body("body").notEmpty().withMessage("Provide body").trim(),
];


const admin_register_validation = [
  // Validate name field
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  // Validate email field
  body('email').isEmail().withMessage('Please provide a valid email address').trim(),
  body("name").notEmpty().withMessage("Provide first name").trim(),
];

module.exports = {register_validation, message_validation, admin_register_validation}