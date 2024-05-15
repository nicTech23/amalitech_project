const express = require("express")
const {Get_all_downloads, Downloads_for_each_file, Insert_download_file } = require("../controllers/download_controller")
const { Router } = express

const download_route = Router()

download_route.post("/insert-download-file/:document_id/:user_id", Insert_download_file)
download_route.get("/get-all-downloads", Get_all_downloads)
download_route.get("/downloads-for-each-file/:document_id", Downloads_for_each_file)

module.exports = download_route