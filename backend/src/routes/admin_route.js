const express = require("express")
const Admin = require("../model/admin")
const { Admin_register, Admin_login } = require("../controllers/admin_controller")
const { admin_register_validation } = require("../middleware/validation")

const { Router } = express

const admin_route = Router()

admin_route.post("/register-admin", admin_register_validation, Admin_register)
admin_route.post("/admin-login",  Admin_login)

module.exports = admin_route