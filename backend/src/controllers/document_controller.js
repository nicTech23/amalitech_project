const Document = require("../model/document")
const { decodeToken } = require("../utils/jwt")


// Endpoint to create a new document
//POST
// http://localhost:8000/api/v1/document-route/create-document
exports.Create_document = async (req, res) => {
    try {

        //admin id from isAdmin middleware
        const admin_id = req.id

        // Extract data from request body
        const { title, description, type } = req.body;

        // Get filename from uploaded file
        const file = req.file?.filename;
        
        // Create document in database
        const create_document = await Document.create({ title, description, file, type,  createdBy:admin_id});

        if (!create_document) throw new Errow("Failed to insert a file")
        
        // Return success response
        return res.status(200).json({ msg: "Document created" });

    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};


// Endpoint to list all files
//GET
// http://localhost:8000/api/v1/document-route/get-all-files
exports.Get_all_files = async (req, res) => {
    try {
        // Find all files in database
        const files = await Document.find();

        // Return files
        return res.status(200).json({ msg: files });

    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};


// Endpoint to get files of a specific type
//GET
// http://localhost:8000/api/v1/document-route//get-type-of-file/type
exports.Get_type_of_file = async (req, res) => {
    try {
        const { type } = req.params;

        // Find files of specific type in database
        const files = await Document.find({ type: type });

        // If no files found, return error
        if (!files || files.length === 0) return res.status(400).json({ msg: "No file found" });

        // Return files
        return res.status.json({ msg: files });

    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};

// Endpoint to search for files
//GET
// http://localhost:8000/api/v1/document-route/search-file?search=yaw
exports.Search_file = async (req, res) => {
    try {
        const { search } = req.query;

        // Search for files based on title or description
        const searchResults = await Document.find({
            $or: [
                { description: { $regex: search, $options: "i" } }, // Case-insensitive search for description
                { title: { $regex: search, $options: "i" } },// Case-insensitive search for title
                { type: { $regex: search, $options: "i" } }// Case-insensitive search for type
            ]
        });

        // If no search results found, return error
        if (!searchResults || searchResults.length === 0) {
            return res.json({ msg: "No files found" });
        }
        
        // Return search results
        return res.json({ msg: searchResults });
        
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};

