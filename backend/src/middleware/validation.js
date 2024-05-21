const { body, validationResult } = require('express-validator');


// const register_validation = [
//   // Validate name field
//   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//   // Validate email field
//   body('email').isEmail().withMessage('Please provide a valid email address').trim(),
//   body("first_name").notEmpty().withMessage("Provide first name").trim(),
//   body("last_name").notEmpty().withMessage("Provide last name").trim(),
//   body("telephone").notEmpty().withMessage("Provide telephone number").trim()
// ];

// const message_validation = [
//   body("recipient").notEmpty().withMessage("Provide recipient").trim().isEmail().withMessage('Please provide a valid email address'),
//   body("subject").notEmpty().withMessage("Provide subject").trim(),
//   body("body").notEmpty().withMessage("Provide body").trim(),
// ];


// const admin_register_validation = [
//   // Validate name field
//   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//   // Validate email field
//   body('email').isEmail().withMessage('Please provide a valid email address').trim(),
//   body("name").notEmpty().withMessage("Provide first name").trim(),
// ];


// Validation rules for user registration
const register_validation = [
    // Validate first name field
    body("first_name").notEmpty().withMessage("Please provide your first name").trim(),
    // Validate last name field
    body("last_name").notEmpty().withMessage("Please provide your last name").trim(),
     // Validate password field
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    // Validate email field
    body('email').isEmail().withMessage('Please provide a valid email address').trim(),
    // Validate telephone field
    body("telephone").notEmpty().withMessage("Please provide your telephone number").trim()
];


const login_validation = [
    // Validate email field
    body('email').notEmpty().withMessage("Please provide your email").trim(),
    // Validate password field
    body('password').notEmpty().withMessage("Please provide your password").trim(),
];

// Validation rules for sending a message
const message_validation = [
    // Validate recipient field
    body("recipient").notEmpty().withMessage("Please provide a recipient").trim().isEmail().withMessage('Please provide a valid email address'),
    // Validate subject field
    body("subject").notEmpty().withMessage("Please provide a subject").trim(),
    // Validate body field
    body("body").notEmpty().withMessage("Please provide a message body").trim(),
];

// Validation rules for admin registration
const admin_register_validation = [
    // Validate password field
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    // Validate email field
    body('email').isEmail().withMessage('Please provide a valid email address').trim(),
    // Validate name field
    body("name").notEmpty().withMessage("Please provide your name").trim(),
];

module.exports = {register_validation, message_validation, admin_register_validation, login_validation }