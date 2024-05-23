const mongoose = require("mongoose")

const downloadSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"document"
    },
    downloadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
},{
    timestamps:true
})

const Download = mongoose.model("download", downloadSchema)
module.exports = Download