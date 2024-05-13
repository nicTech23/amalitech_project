const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default:"admin"
    }, 
    name: {
        type: String,
        required:true
    }
}, {
    timestamps:true
})

const Admin = mongoose.model("admin", adminSchema)

module.exports = Admin