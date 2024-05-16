import axios from "axios"
const get_table_field = async (rows, creatData, setRows) => {
    try {
    
        const document_response = await axios.get(`http://localhost:8000/api/v1/document-route/get-all-files`);
        const document_data = document_response?.data?.msg;
        let download
        let message
        const promises = document_data.map(async (data) => {
            const message_response = await axios.get(`http://localhost:8000/api/v1/message-route/messages-for-each-file/${data._id}`);
            const message_data = await message_response.data?.msg;
            
            const download_response = await axios.get(`http://localhost:8000/api/v1/download-route/downloads-for-each-file/${data._id}`);
            const download_data = await download_response.data?.msg;

            return creatData(data.title, data.type, download_data, message_data);
        });

        const resolvedPromises = await Promise.all(promises);
        setRows(resolvedPromises);
    } catch (error) {
        console.log(error.message);
    }
};
export default get_table_field