const mongoose = require("mongoose")

const downloadSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"document"
    }
},{
    timestamps:true
})

const Download = mongoose.model("download", downloadSchema)
module.exports = Download