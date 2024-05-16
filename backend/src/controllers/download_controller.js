const Download = require("../model/download");
const User = require("../model/user");

exports.Insert_download_file = async(req, res) =>{
    try {
        const { document_id, user_id } = await req.params
        //console.log(file_id, user_id)
        const downloaded = await Download.create({ document: document_id, downloadBy: user_id })

        if (!downloaded) return res.status(400).json({ msg: "Unable to download" })
        
        return res.status(200).json({msg: "Download successfull"})
        
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