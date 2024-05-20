const express = require("express")
const {Get_all_downloads, Downloads_for_each_file, download_file } = require("../controllers/download_controller")
const { Router } = express

const download_route = Router()

//Route for downloas
download_route.get("/download-file/:document_id/:file_name/", download_file)
download_route.get("/get-all-downloads", Get_all_downloads)
download_route.get("/downloads-for-each-file/:document_id", Downloads_for_each_file)

module.exports = download_route 