const Message = require("../model/messages");
const path = require("path")
const nodeMailer = require("../utils/nodeMailer")
const { validationResult } = require("express-validator");
const {decodeToken} = require("../utils/jwt")

//POST
//ROUTE: http://localhost:8000/api/v1/message-route/send-message/document_id/
//This route let the user to send file to an email
exports.send_message = async (req, res) => {
    //checkining input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const body = req.body.body
        const subject = req.body.subject
        const recipient = req.body.recipient
        const file_name = req.body.file_name

        const { document_id} = req.params
       
        //Extracting user token from the session 
        const user_token = req.session?.user_token

        //Decoding the token to get user id
        const decode = decodeToken(user_token)
        
        if (decode?.message === "jwt expired") throw new Error("Time out")
        
        if (decode?.message === "invalid token") throw new Error("Unauthorize access")

        const { id } = decode
        
        //file attached to the email
        const attachments = [
            {
                filename: file_name,
                path:`./public/files/${file_name}` //`/public/files${file_name}`
            }
        ];
        
        // sending the email
        const mail = await nodeMailer(recipient, `<p>${body}</p>`, subject, attachments)
       
       // saving email message. user_id, and document_id to the database
        const message = await Message.create({ body, subject, document: document_id, messageBy: id, recipient })
        
        if (!message) return res.status(400).json("Message fails")

        return res.status(200).json({msg: "Message successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

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


//GET
//ROUTE: http://localhost:8000/api/v1/message-route/messages-for-each-file/document_id
//This route let admin to see the total number of each file send to an email by user
exports.Messages_for_each_file = async (req, res) =>{
    try {
        const { document_id } = req.params
        
        //Counting messeages sent for each document in the database
        const total_messages = await Message.countDocuments({ document: document_id })
        
        if (!total_messages || total_messages <= 0) return res.json({ msg: "0" })

        return res.status(200).json({msg:total_messages })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


