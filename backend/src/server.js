const express = require("express")
const dotenv = require("dotenv")
const user_auth_router = require("./routes/user_auth_route")
const admin_router = require("./routes/admin_route")
const document_route = require("./routes/document_route")
const db_connect = require("./config/db_connect")
const session = require("express-session")
const download_route = require("./routes/download_route")
const message_route = require("./routes/message_route")
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");

const app = express()

dotenv.config()

const port = process.env.PORT || 8000 

//Middleware
app.use(express.json())

// Initialize client with custom host and port (update these values if needed)
let redisClient = createClient({
  
  
  socket: {
    // host: process.env.REDIS_HOST || 'oregon-redis.render.com', // Replace with your Redis server host
    // port: process.env.REDIS_PORT || 6379,    // Replace with your Redis server port
    // username:`red-cp8td65ds78s73c9be2g`,
    // password: `DzvIrlgvSVgNOp0UbKgsZoOTXQtko44f` 
    url: "rediss://red-cp8td65ds78s73c9be2g:DzvIrlgvSVgNOp0UbKgsZoOTXQtko44f@oregon-redis.render.com:6379",
  password:"DzvIrlgvSVgNOp0UbKgsZoOTXQtko44f"
  },
  legacyMode: true // Required for compatibility
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "amalitech_project:",
});

app.use(session({
  secret: process.env.SECRETE_KEY,
  saveUninitialized: false, 
   store: redisStore,
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
  res.setHeader('Access-Control-Allow-Origin', ["http://localhost:3000"||'*']);
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