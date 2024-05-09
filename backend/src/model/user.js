const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    telephone: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})


const User = mongoose.model("user", userSchema)

module.exports = User