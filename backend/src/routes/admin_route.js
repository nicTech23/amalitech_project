const express = require("express")
const Admin = require("../model/admin")
const { Admin_register } = require("../controllers/admin_controller")

const { Router } = express

const admin_route = Router()

admin_route.post("/", Admin_register)

module.exports = admin_route