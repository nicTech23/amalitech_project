const Message = require("../model/messages");
const path = require("path")
const nodeMailer = require("../utils/nodeMailer")
//require("../../public/files")

exports.send_message = async (req, res) => {
    try {
        const body = req.body.body
        const title = req.body.title
        const recipient = req.body.recipient
        const file_name = req.body.file_name

        const attachmentPath = path.join(__dirname, 'public', 'files', file_name);
        
        const attachments = [
            {
                filename: file_name,
                path:`./public/files/${file_name}` //`/public/files${file_name}`
            }
        ];

        const { document_id, user_id } = req.params
        
        const message = Message.create({ body, title, document: document_id, messageBy: user_id, recipient})
        
        if (!message) return res.status(400).json("Message fails")

        nodeMailer(recipient, `<p>${body}</p>`, title, attachments)

        return res.status(200).json({msg: "Message successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
// exports.send_message = async (req, res) => {
//     try {
//         const body = req.body.body
//         const title = req.body.title
//         const recipient = req.body.recipient
//         const file_name = req.body.file_name

//         const attachmentPath = path.join(__dirname, 'public', 'files', file_name);
        
//         const attachments = [
//             {
//                 filename: file_name,
//                 path: `/public/files${file_name}`
//             }
//         ];

//         const { document_id, user_id } = req.params
        
//         const message = Message.create({ body, title, document: document_id, messageBy: user_id, recipient})
        
//         if (!message) return res.status(400).json("Message fails")

//         nodeMailer(recipient, `<p>${body}</p>`, title, attachments)

//         return res.status(200).json({msg: "Message successfully"})
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }

exports.get_all_messages = async(req, res)=>{
    try {
        const messages = await Message.find()
        if (!messages || messages.length <= 0) return res.status(400).json({ msg: "No message found" })
        return res.status(200).json({msg: messages})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.Messages_for_each_file = async (req, res) =>{
    try {
        const { document_id } = req.params
        
        const total_messages = await Message.countDocuments({document:document_id})
        if (!total_messages || total_messages <= 0) return res.json({ msg: "0" })
        return res.status(200).json({msg:total_messages })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


