const Download = require("../model/download");
const User = require("../model/user");
const path = require("path")
const fs = require("fs");
const { decodeToken } = require("../utils/jwt");
const { error } = require("console");



// GET
// ROUTE: http://localhost:8000/api/v1/download-route/download-file/document_id/file_name/
// This route allows the user to download a file
exports.download_file = async (req, res) => {
    try {
        // Extract document_id and file_name from request parameters
        const { document_id, file_name } = req.params;

        // // Extract user token from the session 
        // const user_token = req.session?.user_token;

        // // If user is not logged in, throw error
        // if (typeof user_token === "undefined") throw new Error("Login as user to download a file");

        // // Decode the token to get user id
        // const decode = decodeToken(user_token);
        
        // // Handle expired token
        // if (decode?.message === "jwt expired") throw new Error("Time out");
        
        // // Handle invalid token
        // if (decode?.message === "invalid token") throw new Error("Unauthorized access");
        
        // Sending the downloaded file to the client
        res.download(`./public/files/${file_name}`); 
        
        // Storing the download details to the database
        const download = await Download.create({ document: document_id });

        // If download creation fails, throw error
        if (!download) throw new Error("Download fails");
        
        // Return success response (optional)
        // return res.json({ msg: "Download successfully" });
        
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};



// GET
// ROUTE: http://localhost:8000/api/v1/download-route/downloads-for-each-file/document_id
// This route allows the admin to see the number of downloads for each file
exports.Downloads_for_each_file = async (req, res) => {
    try {
        // Extract file id from request parameters
        const { document_id } = req.params;
    
       // Get the number of downloads for the file id
        const total_downloaded = await Download.countDocuments({ document: document_id });

        // If no downloads found, return 0
        if (!total_downloaded || total_downloaded.length <= 0) return res.json({ msg: 0 });
        
        // Return total number of downloads for the file
        return res.status(200).json({ msg: total_downloaded });
    } catch (error) {
         // Handle errors
         return res.status(500).json({ msg: error.message });
    }
};


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