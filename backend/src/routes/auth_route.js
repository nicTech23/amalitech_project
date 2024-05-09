const express = require("express")
const {Register, User_login, forgot_password, update_password} = require("../controllers/auth_controller")
const { Router } = express

const {register_validation} = require("../utils/validation")

const auth_router = Router()


auth_router.get("/", (req, res)=>{
    console.log(req.session.token)
    res.send("hello")
})

auth_router.post("/register", register_validation, Register)
auth_router.post("/user-login", User_login)
auth_router.post("/forgot-password", forgot_password)
auth_router.put("/update-password", update_password)




module.exports = auth_router