const { validationResult } = require("express-validator");
const Admin = require("../model/admin")
const { hash_password, comapare_password } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");





// Endpoint for admin login
//POST
//http://localhost:8000/api/v1/admin-route/register-admin
exports.Admin_register = async (req, res) => {
    //Input fields error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        // Extract data from request body
        const { name, email, password } = req.body;
        
        // Check if admin with given email already exists
        const find_admin = await Admin.findOne({ email });
        
        // If admin already exists, throw error
        if (find_admin) throw new Error("Admin already exists");

        // Hash the password
        const password_hash = hash_password(password);
        
        // Create new admin
        const admin = Admin.create({ name, email, password: password_hash });
        
        // If admin creation fails, throw error
        if (!admin) throw new Error("Registration fails");
        
        // Return success response
        return res.status(200).json({ msg: "Registration successful" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};


//Endpoint to register a new admin
//POST
//Route: http://localhost:8000/api/v1/admin-route/admin-login
exports.Admin_login = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find admin in the database
        const admin = await Admin.findOne({ email });

        // If admin not found, throw error
        if (!admin) throw new Error("Admin not found");
        
        // Get admin's password from database
        const admin_password = admin.password;

        // Verify the password 
        const password_verify = comapare_password(password, admin_password);

        // If password incorrect, throw error
        if (!password_verify) throw new Error("Incorrect password");

        // Generate JWT token for the admin
        const token = generateToken(admin.id, "2d");
        
        // Store token in admin's cookie
         res.cookie('admin_token', token, {
            httpOnly: true, // Recommended for security
            secure:process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
        });

        // Return success response with admin ID
        return res.status(200).json({ msg: "Login successful", data: admin._id });
        
    } catch (error) {
        // Handle errors
        return res.status(504).json({ msg: error.message });
    }
};
