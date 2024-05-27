const express = require("express")
const {Get_all_downloads, Downloads_for_each_file, download_file } = require("../controllers/download_controller")
const { is_admin } = require("../middleware/is_admin")
const { is_user } = require("../middleware/is_user")
const { Router } = express

const download_route = Router()

//Route for downloas
download_route.get("/download-file/:document_id/", is_user, download_file)
download_route.get("/get-all-downloads", Get_all_downloads)
download_route.get("/downloads-for-each-file/:document_id",is_admin, Downloads_for_each_file)

module.exports = download_route 