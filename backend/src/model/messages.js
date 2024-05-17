const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"document"
    },
    messageBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    recipient: {
        type: String, 
        required:true
    },
}, {
    timestamps: true
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message
