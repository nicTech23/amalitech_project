const Document = require("../model/document")

exports.Create_document = async(req, res)=>{
    try {
        const { title, description, type } = req.body

        const file = req.file?.filename 
        
        const create_document = await Document.create({title, description, file, type})

        return res.status(200).json({msg: "Document created"})

    } catch (error) {
        return res.status(500).json({msg: error.message}) 
    }
}


exports.Get_all_files = async(req, res)=>{
    try {
        const files = await Document.find()
        return res.status(200).json({msg: files})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.Get_type_of_file = async ()=>{
    try {
        const { name } = req.params
        const files = await Document.find({ type: name })
        if (!files) return res.status(400).json({ msg: "No file found" })
        return res.status.json({msg: files})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.Search_file = async (req, res) => {
    try {
        const { search } = req.query;
        console.log(search)

        const searchResults = await Document.find({
            $or: [
                { description: { $regex: search, $options: "i" } }, // Case-insensitive search for description
                { title: { $regex: search, $options: "i" } } // Case-insensitive search for title
            ]
        });

        if (!searchResults || searchResults.length === 0) {
            return res.json({ msg: "No files found" });
        }
        
        return res.json({ msg: searchResults });
        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};





