const { validationResult } = require("express-validator");
const User = require("../model/user")
const { comapare_password, hash_password } = require("../utils/bcrypt");
const { generateToken, decodeToken } = require("../utils/jwt");
const NodeMailer = require("../utils/nodeMailer");

//POST
//Route: http://localhost:8000/api/v1/user_auth-route/register
exports.Register = async (req, res) =>{
    //checkining input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const { first_name, last_name, email, password, telephone } = await req.body

        //Checking if user already exists
        const find_user = await User.findOne({ email })
        
        if (find_user) throw new Error("User already exists")

       //hashing user password
        const hashed_password = hash_password(password)

        //inserting user data into the database
        const user = await User.create({ first_name, last_name, email, password:hashed_password, telephone})
       
        if (!user) throw new Error("Registration fails")
        const token = generateToken(user._id, "2m")
        
        const link = `http://localhost:3000/verify/${token}`

        await NodeMailer(email, `<a href=${link}>Click to verify account</a>`, "Verify account", null)

        if (user) {
            return res.status(200).json({msg: "User registered successfully"})
        }
    } catch (error) {
        return res.status(504).json({msg: error.message})
    }
}


//POST
//Route: http://localhost:8000/api/v1/user_auth-route/user-login
exports.User_login = async (req, res) =>{
    try {
        const { email, password } = req.body

        //finding User in the database
        const user = await User.findOne({ email })

        if (!user) throw new Error("User not found")
        
        const user_password = user.password

        const verify = user.verify

        console.log(verify)


        if (verify == false) throw new Error("account not verified")
        

        // verifying user password
        const password_verify = comapare_password(password, user_password)

        if (!password_verify) throw new Error("Incorrect password" ) 
        
        // generating jwt token for the user
        const token = generateToken(user.id, "2d")
        
        //attaching token to the user session
        req.session.user_token = token

        return res.status(200).json({ms: "login successfull", data:user.id}) 
        
    } catch (error) {
        return res.status(504).json({ msg: error.message }) 
    }
}


//POST
//Route: http://localhost:8000/api/v1/user_auth-route/forgot-password
exports.Forgot_password = async (req, res)=>{
    try {
        const { email } = req.body

        //finding user in the database with email
        const user = await User.findOne({ email })
        
        if (!user) throw new Error("Email not found")
        
        // Generating jwt token for the user to reset password
        const token = generateToken({email: user.email, id:user.id}, "1m")
        
        // attaching token to the user session
        req.session.forget_token = token

        return res.status(200).json({msg: "You can now set your password within 3m from now"})

    } catch (error) {
        if(error.message === "Email not found" ) return res.status(401).json({ msg: error.message }) 
        return res.status(500).json({ msg: error.message }) 
    }
}

//PUT
//Route: http://localhost:8000/api/v1/user_auth-route/update-password
exports.Update_password = async (req, res) => {
    try {
        const { password, confirm_password } = req.body
        
        // comparete the two password to see if it match
        if(password != confirm_password) return res.status(401).json({msg: "password does not match"})
        
        // getting the user request token 
        const token = await req?.session?.forget_token
        
        // decoding the token for verification
        const decode = decodeToken(token)
        
        if (decode?.message === "jwt expired") throw new Error("Time out")
        
        if (decode?.message === "invalid token") throw new Error("Unauthorize access")
        
        //extract user user email from the decoded token
        const { id: { email } } = decode

        console.log(email)
        
        // hashing user password
        const password_hash = hash_password(password)

        //finding user and updating the password
        const user = await User.findOneAndUpdate({ email: email }, { password: password_hash });
    
        if (!user) throw new Error("Unable to update passwor")
        
         return res.status(200).json({msg: "Password updated successfully"})

    } catch (error) {
        return res.status(500).json({ msg: error.message }) 
    }
}


exports.Verify_account = async(req, res)=>{
    try {
        const { token } = req.params
        const decode_token = decodeToken(token)

        if (decode_token?.message === "jwt expired") throw new Error("Time out")
        
        if (decode_token?.message === "invalid token") throw new Error("Unauthorize access")

        const { id } = decode_token

        const update_verify = await User.findByIdAndUpdate({ _id: id }, { verify: true })

        if(!update_verify) throw new Error("verification failed")
        
        return res.status(200).json({msg:"verified"})
        
    } catch (error) {
        return res.status(500).json({ msg: error.message }) 
    }
}