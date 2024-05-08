const mongoose = require("mongoose")

const db_connect = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/amalitech_project")
        console.log("db connected")
    } catch (error) {
        console.log("db not connected", error)
    }
}

module.exports = db_connect