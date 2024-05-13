const express = require("express")
const dotenv = require("dotenv")
const auth_router = require("./routes/auth_route")
const db_connect = require("./config/db_connect")
const session = require("express-session")

const app = express()

dotenv.config()
const port = process.env.PORT || 8000 

//Middleware
app.use(express.json())

app.use(session({
  secret: process.env.SECRETE_KEY,
  saveUninitialized: false, 
  resave: false,
  cookie: {
    secure: false, // Set it to true if using HTTPS
    httpOnly: true, // Make the cookie HttpOnly
    maxAge: 60000 * 30
  }
}))

// app.use((_, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

// Routes
app.use("/api/v1/auth-route", auth_router)

app.get("*", (_, res)=>{
    res.send("<h1>Page not found</h1>")
})




app.listen(port, ()=>{
    console.log(`port is running on ${port}`)
    db_connect()
})