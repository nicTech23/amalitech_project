const { decodeToken } = require("../utils/jwt");

exports.is_user = async(req, res, next)=>{
    try {
         // Extracting user token from the cookie 
        const user_token = req.headers?.authorization?.split(" ")[1] || req.cookies?.user_token1
       
        console.log(req.cookies)
        // If user is not logged in, throw error
        if (typeof user_token === "undefined") throw new Error("Login as user");

        // Decoding the token to get user id
        const decode = decodeToken(user_token); 
        
        // Handle expired token
        if (decode?.message === "jwt expired") throw new Error("Time out");
        
        // Handle invalid token
        if (decode?.message === "invalid token") throw new Error("Unauthorized access");
        
        const { id } = decode;

        req.id = id

        next()
        
    } catch (error) {
         // Handle errors
        return res.status(500).json({ msg: error.message });
    }
}