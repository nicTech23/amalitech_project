const express = require("express")
const {Register} = require("../controllers/auth_controller")
const { Router } = express

const {register_validation} = require("../utils/validation")

const auth_router = Router()


auth_router.get("/", (req, res)=>{
    res.send("hello")
})

auth_router.post("/register", register_validation,  Register)




module.exports = auth_router