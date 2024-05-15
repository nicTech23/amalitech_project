const mongoose = require("mongoose")

const downloadSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"document"
    },
    downloadBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: "user"
    }
},{
    timestamps:true
})

const Download = mongoose.model("download", downloadSchema)
module.exports = Download