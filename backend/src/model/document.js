const mongoose = require("mongoose")
const documentShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    file: {
        type: String,
        require:true
    }
}, {
    timestamps:true
})

const Document = mongoose.model("document", documentShema)
module.exports = Document