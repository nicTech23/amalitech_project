const Download = require("../model/download");
const User = require("../model/user");
const path = require("path")
const fs = require("fs")
exports.download_file = async(req, res) =>{
    try {
        console.log("samo")
        const { feed_id, user_id, file } = req.params
         
        // res.download(`./public/files/${file}`,(err)=>{
        //     console.log(err)
        // })
       
    //     const downloaded = await Download.create({ document: feed_id, downloadBy: user_id })

    //    if (!downloaded) return res.status(400).json({ msg: "Unable to download" })
    
        if (fs.existsSync(`./public/files/${file}`,)) {
            console.log("file")
        }
         res.download(`./public/files/file_1715956185935.pdf`)
        // res.download(`./public/files/${file}`, file, (err) => {
        //     if (err) {
        //         console.error('Error downloading the file:', err);
        //         if (!res.headersSent) {
        //             return res.status(500).json({ msg: 'Error downloading the file' });
        //         }
        //     } else {
        //         console.log('File downloaded successfully');
        //     }
        // });
        //return res.status(200).json({msg: "Download successfull"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.Get_all_downloads = async(req, res)=>{
    try {
        const downloaded = await Download.find()
        if (downloaded.length <=0 || !downloaded) return res.status(400).json({ msg: "Now downloaded file" })

        return res.status(200).json({ msg: downloaded })
    } catch (error) {
        
    }
}


exports.Downloads_for_each_file = async(req, res)=>{
    try {

        const { document_id } = req.params
        
        const total_downloaded = await Download.countDocuments({document:document_id})

        if (!total_downloaded || total_downloaded.length <=0) return res.json({ msg: 0 })
        
        return res.status(200).json({ msg: total_downloaded })
    } catch (error) {
        
    }
}