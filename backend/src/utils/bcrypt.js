const bcrypt = require("bcrypt")

const hash_password = (password)=>{
    const salt =  bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt) 
}

const comapare_password = (password, hashed) =>{
    return bcrypt.compareSync(password, hashed)
}

module.exports = {comapare_password, hash_password} 