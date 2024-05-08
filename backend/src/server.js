const express = require("express")
const dotenv = require("dotenv")
const auth_router = require("./routes/auth_route")
const db_connect = require("./config/db_connect")

const app = express()

dotenv.config()
const port = process.env.PORT || 8000 

//Middleware
app.use(express.json())

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// Routes
app.use("/api/v1/auth-route", auth_router)

app.get("*", (_, res)=>{
    res.send("<h1>Page not found</h1>")
})




app.listen(port, ()=>{
    console.log(`port is running on ${port}`)
    db_connect()
})