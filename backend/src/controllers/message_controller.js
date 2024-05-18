const Message = require("../model/messages");
const path = require("path")
const nodeMailer = require("../utils/nodeMailer")
const { validationResult } = require("express-validator");

//POST
//ROUTE: http://localhost:8000/api/v1/message-route/send-message/document_od/user_id/
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

        const { document_id, user_id } = req.params
       
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
        const message = await Message.create({ body, subject, document: document_id, messageBy: user_id, recipient })
        
        if (!message) return res.status(400).json("Message fails")

        return res.status(200).json({msg: "Message successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

//GET
//ROUTE: http://localhost:8000/api/v1/message-route/get-all-messages/
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


