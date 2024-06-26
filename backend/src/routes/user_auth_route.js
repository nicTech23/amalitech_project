const express = require("express")
const {Register, User_login, Forgot_password, Update_password, Verify_account, logout} = require("../controllers/user_auth_controller")
const { Router } = express

const { register_validation, login_validation , update_password, forget_password } = require("../middleware/validation")

const user_auth_router = Router()


user_auth_router.get("/", async(req, res)=>{

   // res.download("./file_1715787681029.pdf")
    
    res.download(`./public/files/file_1715956185935.pdf`)
})

user_auth_router.post("/register", register_validation, Register)
user_auth_router.post("/user-login", login_validation,  User_login)
user_auth_router.post("/forgot-password", forget_password, Forgot_password) 
user_auth_router.put("/update-password/:token",update_password,  Update_password)
user_auth_router.get("/verify-account/:token", Verify_account)
//user_auth_router.get("/logout", logout)




module.exports = user_auth_router