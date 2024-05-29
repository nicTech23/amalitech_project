const jwt = require("jsonwebtoken")

const generateToken = (id, exp)=>{
    return jwt.sign({id}, process.env.SECRETE_KEY, {expiresIn: exp})
}

const decodeToken = (token) =>{
    return jwt.verify(token, process.env.SECRETE_KEY, (err, data)=>{
        if (err) {
            return err.message
        } else {
            return data
        }
    })
}

module.exports = {decodeToken, generateToken}