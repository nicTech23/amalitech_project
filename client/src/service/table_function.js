import axios from "axios"
import Cookies from 'js-cookie';
const get_table_field = async (setError, creatData, setRows) => {
    try {
        const admin_token = Cookies.get("admin_token")
        const document_response = await axios.get(`http://localhost:8000/api/v1/document-route/get-all-files`);
        const document_data = await document_response?.data?.msg;

        console.log("ddd", document_data)
        let download
        let message
        const promises = document_data.map(async (data) => {
            
            const message_response = await axios.get(`http://localhost:8000/api/v1/message-route/messages-for-each-file/${data._id}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${admin_token}`
                }
            });
            const message_data = await message_response.data?.msg;
            
            const download_response = await axios.get(`http://localhost:8000/api/v1/download-route/downloads-for-each-file/${data._id}`, {
                withCredentials: true, 
                 headers: {
                    'Authorization': `Bearer ${admin_token}`
                }
            });
            const download_data = await download_response.data?.msg;

            return creatData(data.title, data.type, download_data, message_data);
        });

        const resolvedPromises = await Promise.all(promises);
        setRows(resolvedPromises);
    } catch (error) {
        setError(error?.response?.data.msg || error?.response?.data.errors || error.message)
       const timer = setInterval(()=>{
            setError(null)
          }, [2000])

          setTimeout(() => {
            clearInterval(timer)
          }, 2000);
    }
};
export default get_table_field