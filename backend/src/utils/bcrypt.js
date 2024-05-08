const bcrypt = require("bcrypt")

const hash_password = async (password)=>{
    const salt = bcrypt.salt(10)
    return bcrypt.hash(password, salt)
}

const comapare_password = async(password, hashed) =>{
    return bcrypt.compare(password, hashed)
}

module.exports = {comapare_password, hash_password}