const { validationResult } = require("express-validator");
const User = require("../model/user")
const { comapare_password, hash_password } = require("../utils/bcrypt");
const { generateToken, decodeToken } = require("../utils/jwt");

exports.Register = async (req, res) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const { first_name, last_name, email, password, telephone } = await req.body

        const hashed_password = hash_password(password)

        const user = await User.create({ first_name, last_name, email, password:hashed_password, telephone})
        
        if (user) {
            return res.status(200).json({msg: "User registered successfully"})
        }
    } catch (error) {
        return res.status(504).json({msg: error.message})
    }
}


exports.User_login = async (req, res) =>{
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) throw new Error("User not found")
        
        const user_password = user.password

        const password_verify = comapare_password(password, user_password)

        if (!password_verify) throw new Error("Incorrect password" ) 
        
        const token = generateToken(user.id, "1s")
        
        req.session.auth_token = token
        
        return res.status(200).json({ decode }) 
        
    } catch (error) {
        if(error.message === "User not found") return res.status(401).json({ msg: error.message }) 
        if(error.message === "Incorrect password") return res.status(401).json({ msg: error.message }) 
        return res.status(500).json({ msg: error.message }) 
    }
}


exports.forgot_password = async (req, res)=>{
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        
        if (!user) throw new Error("Email not found")
        
        const token = generateToken({email: user.email, id:user.id}, "2m")

        req.session.forget_token = token

        return res.status(200).json({msg: "You can now set your password with 2 minute from now"})

    } catch (error) {
        if(error.message === "Email not found" ) return res.status(401).json({ msg: error.message }) 
        return res.status(500).json({ msg: error.message }) 
    }
}


exports.update_password = async (req, res) => {
    try {
        const { password, confirm_password} = req.body
        
        if(password !== confirm_password) return res.status(401).json({msg: "password does not match"})
        
        const token = req.session.forget_token
        const decode = decodeToken(token)
        
        if (decode?.message === "jwt expired") return res.status(408).json({ msg: "Time out" })
        
        if (decode?.message === "invalid token") return res.status(401).json({ msg: "Unauthorize access" })
        
        const { email } = decode

        const user = await User.findByIdAndUpdate({ email }, { password: password }, { new: true })
        
        if (!user) return res.status(401).json({ msg: "Unable to update passwor" })
        
        return res.status(200).json({msg: "Password updated successfully"})


    } catch (error) {
        return res.status(500).json({ msg: error.message }) 
    }
}



// EXPIRED TOKEN
// "decode": {
//         "name": "TokenExpiredError",
//         "message": "jwt expired",
//         "expiredAt": "2024-05-09T17:07:37.000Z"
//     }


//WRONG TOKEN
// {
//     "decode": {
//         "name": "JsonWebTokenError",
//         "message": "invalid token"
//     }
// }