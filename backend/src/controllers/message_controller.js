const Message = require("../model/messages");
const path = require("path")
const nodeMailer = require("../utils/nodeMailer")
const { validationResult } = require("express-validator");
const {decodeToken} = require("../utils/jwt");
const Document = require("../model/document");


// POST
// ROUTE: http://localhost:8000/api/v1/message-route/send-message/:document_id/
// This route allows the user to send a file to an email
// Make sure that the file_name and the document_id are for the same file or document
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

        //check the document if it exists
        const find_document = await Document.findOne({_id: document_id}).select("file")
       
        // throw error if document not found
        if (!find_document) throw new Errow("No such document found")
        
        // get the user_id from isUser middleware
        const user_id = req.id
        
        // File attached to the email
        const attachments = [
            {
                filename: file_name,
                path:`./public/files/${find_document?.file}` 
            }
        ];
        
        // Sending the email
        const mail = await nodeMailer(recipient, subject, attachments, null, null, "email", body);
       
        // Saving email message, user_id, and document_id to the database
        const message = await Message.create({ body, subject, document: document_id, messageBy: user_id, recipient });
        
        // If message creation fails, return error
        if (!message) return res.status(400).json("Message fails");

        // Return success response
        return res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};


// GET
// ROUTE: http://localhost:8000/api/v1/message-route/messages-for-each-file/:document_id
// This route allows the admin to see the total number of each file sent to an email by users
exports.Messages_for_each_file = async (req, res) => {
    try {
        // Extract document_id from request parameters
        const { document_id } = req.params;
        
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
