const mongoose = require("mongoose")

const db_connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db not connected", error)
    }
}

module.exports = db_connect