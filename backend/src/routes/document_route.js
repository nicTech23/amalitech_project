const express = require("express")
const { Router } = express
const { Create_document, Get_all_files, Search_file, Get_type_of_file } = require("../controllers/document_controller")
const upload = require("../utils/multer")
const { is_admin } = require("../middleware/is_admin")
const { is_user } = require("../middleware/is_user")

const document_route = Router()

document_route.post("/create-document" ,is_admin, upload.single("file"), Create_document)
document_route.get("/get-all-files", Get_all_files)

// http://localhost:8000/api/v1/document-route/search-file?search=yaw
document_route.get("/search-file", is_user,Search_file)
document_route.get("/get-type-of-file/:type", Get_type_of_file)




module.exports = document_route

