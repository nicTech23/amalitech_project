const { decodeToken } = require("../utils/jwt");

exports.is_admin = async(req, res, next) =>{
    try {
        // Extract admin token from the session 
        const admin_token = req.cookies?.admin_token;

        // If admin is not logged in, throw error
        if (typeof admin_token === "undefined") throw new Error("Login as admin");
        
        // Decode the admin token for verification
        const decode_token = decodeToken(admin_token);

        // Handle expired token
        if (decode_token?.message === "jwt expired") throw new Error("Time out");
        
        // Handle invalid token
        if (decode_token?.message === "invalid token") throw new Error("Unauthorized access");
        
        const { id } = decode_token
        
        req.id = id
        next()
    } catch (error) {
        // Handle errors
         return res.status(500).json({ msg: error.message });
    }
}