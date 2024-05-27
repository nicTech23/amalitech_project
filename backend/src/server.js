const express = require("express")
const dotenv = require("dotenv")
const user_auth_router = require("./routes/user_auth_route")
const admin_router = require("./routes/admin_route")
const document_route = require("./routes/document_route")
const db_connect = require("./config/db_connect")
const download_route = require("./routes/download_route")
const message_route = require("./routes/message_route")
const cookieParser = require("cookie-parser")

const app = express()

dotenv.config()

const port = process.env.PORT || 8000 

//Middleware
app.use(express.json())
app.use(cookieParser());



app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', [ "http://localhost:3000" || '*' ]);
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use("/api/v1/user_auth-route", user_auth_router)
app.use("/api/v1/admin-route", admin_router)
app.use("/api/v1/document-route", document_route)
app.use("/api/v1/download-route", download_route)
app.use("/api/v1/message-route", message_route)

app.get("/", (_, res)=>{
    res.send("<h1>Amalitech Project</h1>")
})

app.get("*", (_, res)=>{
    res.send("<h1>Page not found</h1>")
})


app.listen(port, ()=>{
    console.log(`port is running on ${port}`)
    db_connect()   
})