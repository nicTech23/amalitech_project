const { decodeToken } = require("../utils/jwt");

exports.is_user_or_admin = async(req, res, next)=>{
    try {
         // Extracting user token from the cookie 
        const user_token = req.headers?.authorization?.split(" ")[1] || req.cookies?.user_token1
       
        const admin_token = req.headers?.authorization?.split(" ")[ 1 ] || req.cookies?.admin_token1
        
        // If user is not logged in, throw error
        const token = admin_token || user_token
        if (typeof token === "undefined") throw new Error("Login as user or admin");

        // Decode the token 

        const decode_token= decodeToken(token); 
        
        
        // Handle expired token
        if (decode_token?.message === "jwt expired") throw new Error("Time out");
        
        // Handle invalid token
        if (decode_token?.message === "invalid token" ) throw new Error("Unauthorized access");

        next()
        
    } catch (error) {
         // Handle errors
        return res.status(500).json({ msg: error.message });
    }
}