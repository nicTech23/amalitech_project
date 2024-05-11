const express = require("express")
const {Register, User_login, Forgot_password, Update_password} = require("../controllers/auth_controller")
const { Router } = express

const {register_validation} = require("../utils/validation")

const auth_router = Router()


auth_router.get("/", (req, res)=>{
    console.log(req?.session?.auth_token)
    res.send("hello")
})

auth_router.post("/register", register_validation, Register)
auth_router.post("/user-login", User_login)
auth_router.post("/forgot-password", Forgot_password)
auth_router.put("/update-password", Update_password)


module.exports = auth_router