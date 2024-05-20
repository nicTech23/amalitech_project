const Message = require("../model/messages");
const path = require("path")
const nodeMailer = require("../utils/nodeMailer")
const { validationResult } = require("express-validator");
const {decodeToken} = require("../utils/jwt")


// POST
// ROUTE: http://localhost:8000/api/v1/message-route/send-message/document_id/
// This route allows the user to send a file to an email
exports.send_message = async (req, res) => {
    // Checking input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        // Extracting request body parameters
        const body = req.body.body;
        const subject = req.body.subject;
        const recipient = req.body.recipient;
        const file_name = req.body.file_name;

        // Extracting document_id from request parameters
        const { document_id } = req.params;
       
        // Extracting user token from the session 
        const user_token = req.session?.user_token;

        // If user is not logged in, throw error
        if (typeof user_token === "undefined") throw new Error("Login as user to send mail");

        // Decoding the token to get user id
        const decode = decodeToken(user_token);
        
        // Handle expired token
        if (decode?.message === "jwt expired") throw new Error("Time out");
        
        // Handle invalid token
        if (decode?.message === "invalid token") throw new Error("Unauthorized access");

        const { id } = decode;
        
        // File attached to the email
        const attachments = [
            {
                filename: file_name,
                path:`./public/files/${file_name}` //`/public/files${file_name}`
            }
        ];
        
        // Sending the email
        const mail = await nodeMailer(recipient, `<p>${body}</p>`, subject, attachments);
       
        // Saving email message, user_id, and document_id to the database
        const message = await Message.create({ body, subject, document: document_id, messageBy: id, recipient });
        
        // If message creation fails, return error
        if (!message) return res.status(400).json("Message fails");

        // Return success response
        return res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};



//GET
//ROUTE: http://localhost:8000/api/v1/message-route/get-all-messages/
//This route let admin to get all files send to an email by user
exports.get_all_messages = async(req, res)=>{
    try {
        const messages = await Message.find()

        if (!messages || messages.length <= 0) return res.json({ msg: "No message found" })

        return res.status(200).json({msg: messages})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


// GET
// ROUTE: http://localhost:8000/api/v1/message-route/messages-for-each-file/document_id
// This route allows the admin to see the total number of each file sent to an email by users
exports.Messages_for_each_file = async (req, res) => {
    try {
        // Extract document_id from request parameters
        const { document_id } = req.params;

        // Extract admin token from the session 
        const admin_token = req.session.admin_token;

        // If admin is not logged in, throw error
        if (typeof admin_token === "undefined") throw new Error("Login as admin");
        
        // Decode the admin token for verification
        const decode_token = decodeToken(admin_token);

        // Handle expired token
        if (decode_token?.message === "jwt expired") throw new Error("Time out");
        
        // Handle invalid token
        if (decode_token?.message === "invalid token") throw new Error("Unauthorized access");
        
        // Counting messages sent for each document in the database
        const total_messages = await Message.countDocuments({ document: document_id });
        
        // If no messages found, return 0
        if (!total_messages || total_messages <= 0) return res.json({ msg: "0" });

        // Return total number of messages for the document
        return res.status(200).json({ msg: total_messages });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};
