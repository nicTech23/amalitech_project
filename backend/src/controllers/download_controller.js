const Download = require("../model/download");
const User = require("../model/user");
const path = require("path")
const fs = require("fs");
const { decodeToken } = require("../utils/jwt");
const { error } = require("console");

//GET
//ROUTE: http://localhost:8000/api/v1/download-route/download-file/document_id/file_name/
//this route allow the user to download file
exports.download_file = async(req, res) =>{
    try {
        const { document_id, file_name } = req.params
        
        //sending the downloaded file to the client
       res.download(`./public/files/${file_name}`)
        
        //storing the download details to the database
        const download = await Download.create({ document: document_id})

        
        if (!download) throw new Error("Download fails")
        
       // return res.json({msg: "download successfully"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

//GET
//ROUTE: http://localhost:8000/api/v1/download-route/get-all-downloads
//this route let the the admin to see all files downloaded
exports.Get_all_downloads = async(req, res)=>{
    try {
        
        //finding all files downloaded
        const downloaded = await Download.find()

        if (downloaded.length <=0 || !downloaded) return res.status(400).json({ msg: "Now downloaded file" })

        return res.status(200).json({ msg: downloaded })
    } catch (error) {
         return res.status(500).json({msg: error.message})
    }
}


//GET
//ROUTE: http://localhost:8000/api/v1/download-route/downloads-for-each-file/document_id
//this route let the admin see the number of downloads for each file
exports.Downloads_for_each_file = async(req, res)=>{
    try {
        //extracting file id from params
        const { document_id } = req.params 
    

        const admin_token = req.session.admin_token

        if(typeof admin_token == "undefined")throw new Error("Login as admin")
        
        const decode_token = decodeToken(admin_token)

        if (decode_token?.message === "jwt expired") throw new Error("Time out")
        
        if (decode_token?.message === "invalid token") throw new Error("Unauthorize access")
       
       // getting the number of downloads for the file id
        const total_downloaded = await Download.countDocuments({document:document_id})

        if (!total_downloaded || total_downloaded.length <=0) return res.json({ msg: 0 })
        
        return res.status(200).json({ msg: total_downloaded })
    } catch (error) {
         return res.status(500).json({msg: error.message})
    }
}