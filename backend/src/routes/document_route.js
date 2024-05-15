const express = require("express")
const { Router } = express
const { Create_document, Get_all_files, Search_file, Get_type_of_file } = require("../controllers/document_controller")
const upload = require("../utils/multer")

const document_route = Router()

document_route.post("/create-document" ,upload.single("file"), Create_document)
document_route.get("/get-all-files", Get_all_files)

// http://localhost:8000/api/v1/document-route/search-file?search=yaw
document_route.get("/search-file" ,Search_file)
document_route.get("/get-type-of-file/:name", Get_type_of_file)




module.exports = document_route

