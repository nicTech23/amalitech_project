const Message = require("../model/messages");

exports.send_message = async (req, res) => {
    try {
       
        const body = req.body.body
        const title = req.body.title
        const { document_id, user_id } = req.params
        
        const message = Message.create({ body, title, document: document_id, messageBy: user_id })
        
        if (!message) return res.status(400).json("Message fails")
        
        return res.status(200).json({msg: "Message successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

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
        const {document_id} =req.params
        const total_messages = await Message.countDocuments({document:document_id})
        if (!total_messages || total_messages <= 0) return res.status(400).json({ msg: "0" })
        return res.status(200).json({msg:total_messages })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


