const { validationResult } = require("express-validator");
const User = require("../model/user")
const { comapare_password, hash_password } = require("../utils/bcrypt");
const { generateToken, decodeToken } = require("../utils/jwt");
const NodeMailer = require("../utils/nodeMailer");


//POST
//Route: http://localhost:8000/api/v1/user_auth-route/register
// Sign up as user
//After signing up email will verification link will send to your email but yous the response token for verification
exports.Register = async (req, res) =>{
   
    // Check for validation errors
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        // Destructure request body
        const { first_name, last_name, email, password, telephone } = await req.body

         // Check if user already exists
        const existing_user = await User.findOne({ email })
        
        if (existing_user) throw new Error("User already exists")

       //hashing user password
        const hashed_password = hash_password(password) 

        //inserting user data into the database
        const user = await User.create({ first_name, last_name, email, password:hashed_password, telephone})
       
         // Check if user creation failed
        if (!user) throw new Error("Registration failed")
        
        // Generate token for user
        const token = generateToken(user._id, "1d")
        
        // Create verification link for email
        const verification_link = `https://nss-project-client.vercel.app/verify/${token}`

        // Send verification email
        await NodeMailer(email, "Verify account", null, first_name, verification_link, 'account_verify')

        // Return success response with token
        //NB: save the token for verification testing
        return res.status(200).json({msg: "User registered successfully", token})
    } catch (error) {
        return res.status(504).json({msg: error.message})
    }
}

//GET
//http://localhost:8000/api/v1/user_auth-route//verify-account/:token
exports.Verify_account = async (req, res) => {
    try {
        const { token } = req.params;
        const decode_token = decodeToken(token);

        // Handle expired token
        if (decode_token?.message === "jwt expired") throw new Error("Time out");

        // Handle invalid token
        if (decode_token?.message === "invalid token") throw new Error("Unauthorized access");

        const { id } = decode_token;

        // Update verification status for the user
        const update_verify = await User.findByIdAndUpdate({ _id: id }, { verify: true });

        // If verification update fails, throw error
        if (!update_verify) throw new Error("Verification failed");
        
        // Return success response
        return res.status(200).json({ msg: "Verified" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};


//POST
//Route: http://localhost:8000/api/v1/user_auth-route/user-login
//Login as a User
exports.User_login = async (req, res) =>{
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const { email, password } = req.body

        //finding User in the database
        const user = await User.findOne({email})

        // If user not found, throw error
        if (!user) throw new Error("User not found")
        
        // Get user password and verification status
        const { password: user_password, verify } = user;

        // If account not verified, throw error
        if (!verify) throw new Error("check your email to verify your account")
        
       // Verify user password
        const password_verify = comapare_password(password, user_password)

        // If password incorrect, throw error
        if (!password_verify) throw new Error("Incorrect password" ) 
        
        // Generate JWT token for the user
        const token = generateToken(user.id, "2d")

        res.cookie('user_token1', token, {
            httpOnly: true, // Helps prevent cross-site scripting (XSS) attacks
            secure: process.env.NODE_ENV === 'production'  ? true : false, // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
            path: '/', // Cookie is accessible on all paths
        });

        // Return success response with user ID
        return res.status(200).json({ms: "login successfull", data:user.id, token}) 
        
    } catch (error) {
        return res.status(504).json({ msg: error.message }) 
    }
}


//POST
//Route: http://localhost:8000/api/v1/user_auth-route/forgot-password
exports.Forgot_password = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user in the database with email
        const user = await User.findOne({ email });

        // If user not found, throw error
        if (!user) {
            throw new Error("Email not found");
        }

        // Generate JWT token for the user to reset password
        const token = generateToken(user.id, "5m");

        // Attach token to the user session
        //req.session.forget_token = token;

        const upate_link = `http://localhost:3000/update-password/${token}`

         // Send verification email
        await NodeMailer(email, "Reset password", null, user.first_name, upate_link, 'update_password', )

        // Return success response
        return res.status(200).json({ msg: "You can now set your password within 5m from now", token});

    } catch (error) {
        // Handle specific error
        if (error.message === "Email not found") {
            return res.status(401).json({ msg: error.message });
        }
        // Handle other errors
        return res.status(500).json({ msg: error.message });
    }
};


//PUT
//Route: http://localhost:8000/api/v1/user_auth-route/update-password/:token
exports.Update_password = async (req, res) => {
    try {
        const { password, confirm_password } = req.body;

        const { token } = req.params
        
        // Decode the token for verification
        const decode = decodeToken(token);
        
        // Handle token decode errors
        if (decode?.message === "jwt expired") throw new Error("Time out");
        if (decode?.message === "invalid token") throw new Error("Unauthorized access");

         // Extract user id from the decoded token
        const {id} = decode;
        
        // Compare the two passwords to see if they match
        if (password != confirm_password) return res.status(401).json({ msg: "Password does not match" });
        
        // Hash the user password
        const password_hash = hash_password(password);

        // Find user and update the password
        const user = await User.findOneAndUpdate({ _id: id }, { password: password_hash });
        
        // If user not found, throw error
        if (!user) throw new Error("Unable to update password");
        
        // Return success response
        return res.status(200).json({ msg: "Password updated successfully" });

    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};



// //GET
// //http://localhost:8000/api/v1/user_auth-route/logout
// exports.logout = async(req, res)=>{
//     try {
//         if (req.session.user_token) {
//             delete req.session.user_token

//             console.log(req.session.user_token)
//             return res.status(200).json({ msg: 'Logout successful' });
//         } else {
//             throw new Error("logout failed")
//         }
        
//     } catch (error) {
//         return res.status(500).json({ msg:error.message });
//     }
// }
