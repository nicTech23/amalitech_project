const express = require("express")
const { send_message, get_all_messages, Messages_for_each_file, } = require("../controllers/message_controller")
const { message_validation } = require("../middleware/validation")
const { is_admin } = require("../middleware/is_admin")
const { is_user } = require("../middleware/is_user")
const { is_user_or_admin } = require("../middleware/is_user_or_admin")
const { Router } = express

const message_route = Router()

message_route.post("/send-message/:document_id", is_user, message_validation, send_message )
message_route.get("/get-all-messages", get_all_messages)
message_route.get("/messages-for-each-file/:document_id", is_admin, Messages_for_each_file)

module.exports = message_route