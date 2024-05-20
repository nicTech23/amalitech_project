const { validationResult } = require("express-validator");
const Admin = require("../model/admin")
const { hash_password, comapare_password } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

exports.Admin_register = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
        const { name, email, password } = req.body
        
        const find_admin = await Admin.findOne({ email })
        
        console.log(find_admin)
        if (find_admin) throw new Error("Admin already exists")

        const password_hash = hash_password(password)
        
        const admin = Admin.create({ name, email, password: password_hash })
        
        if (!admin) throw new Errow("Registeration fails")
        
        return res.status(200).json({msg: "Registeration successfull"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


exports.Admin_login = async (req, res) =>{
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) throw new Error("admin not found")
        
        const admin_password = admin.password

        const password_verify = comapare_password(password, admin_password)

        if (!password_verify) throw new Error("Incorrect password" ) 
        
        const token = generateToken(admin.id, "2d")
        console.log(token)
        
        req.session.admin_token = token

        return res.status(200).json({ms: "login successfull" }) 
        
    } catch (error) {
        return res.status(504).json({ msg: error.message }) 
    }
}



