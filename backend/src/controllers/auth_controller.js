const { validationResult } = require("express-validator");
const User = require("../model/user")
const { comapare_password, hash_password } = require("../utils/bcrypt")

exports.Register = async (req, res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { first_name, last_name, email, password, telephone } = await req.body

        const hashed_password = await hashed_password(password)

        const user = await User.create({ first_name, last_name, email, password:hashed_password})
        
        if (user) {
            return res.status(200).json({msg: "User registered successfully"})
        }
    } catch (error) {
        return res.status(504).json({msg: error.message})
    }
}


exports.login = async (req, res) =>{
    try {
        const { email, password } = req.body
        const user = User.findOne({ email })
        
    } catch (error) {
        return res.status(504).json({msg: error.message})
    }
}


exports.forgot_password = async (req, res)=>{
    
}
