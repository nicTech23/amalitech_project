const express = require("express")
const dotenv = require("dotenv")



const app = express()

dotenv.config()

const port = process.env.PORT || 8000



app.listen(port, ()=>{
    console.log(`port is running on ${port}`)
})