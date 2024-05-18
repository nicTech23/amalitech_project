const express = require("express")
const {Register, User_login, Forgot_password, Update_password} = require("../controllers/auth_controller")
const { Router } = express

const {register_validation} = require("../utils/validation")

const auth_router = Router()


auth_router.get("/", async(req, res)=>{

   // res.download("./file_1715787681029.pdf")
    
    res.download(`./public/files/file_1715956185935.pdf`)
})

auth_router.post("/register", register_validation, Register)
auth_router.post("/user-login", User_login)
auth_router.post("/forgot-password", Forgot_password)
auth_router.put("/update-password", Update_password)




module.exports = auth_router