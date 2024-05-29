const { body, validationResult } = require('express-validator');


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
    body("telephone").isLength({ min: 10 }).withMessage('Telephone must be at least 10 numbers')
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
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim(),
    // Validate email field
    body('email').isEmail().withMessage('Please provide a valid email address').trim(),
    // Validate name field
    body("name").notEmpty().withMessage("Please provide your name").trim(),
];

const update_password = [
     body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim(),
]

const forget_password = [
    body('email').notEmpty().withMessage("Please provide your email").trim(),
]
module.exports = {register_validation, message_validation, admin_register_validation, login_validation, update_password, forget_password }