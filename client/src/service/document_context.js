import React, { createContext, useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';

export const documentContext = createContext(null)
const DocumentProvider = ({children}) => {
    const [ document, setDocument ] = useState({
        title: "",
        description: "",
        type: "",
        file:""
    })
    
    const [message, setMessage] = useState(null)
    
    const [modal, setModal] = useState(false)


    const get_document_values = (e)=>{
        if(e.target.name === "file"){
            setDocument({...document, [e.target.name]:e.target.files[0]})
        } else {
             setDocument({...document, [e.target.name]:e.target.value})
        }

        console.log(document)
    }

    const submit_message = async ()=>{
        try {
            if (Object.values(document).includes("")) {
            setMessage("All fields required")
             const timer = setInterval(()=>{
                    setMessage(null)
                }, [ 5000])
                
                setTimeout(()=>{
                    clearTimeout(timer)
                }, [10000])
        } else {

            const formData = new FormData();

            formData.append('file', document.file);
            formData.append('title', document.title);
            formData.append('description', document.description);
            formData.append('type', document.type);

            const admin_token = Cookies.get("admin_token")
            const response = await axios.post(`https://amalitech-project-server.onrender.com/api/v1/document-route/create-document`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${admin_token}`,
                },
                withCredentials:true
            })
                
            window.location.reload()
            if (response.status === 200) {
                setModal(false)
                setDocument({title: "",
                            description: "",
                            type: "",
                            file:""})
            } else {
                setMessage("Document upload fails")

                const timer = setInterval(()=>{
                    setMessage(null)
                }, [ 1000])
                
                setTimeout(()=>{
                    clearTimeout(timer)
                }, [2000])
            } 
        }
        } catch (error) {
            setMessage(error?.response?.data.msg || error?.response?.data.errors || error.message)
            console.log(error)
        }
    }

  return (
    <documentContext.Provider value={{
          get_document_values,
          submit_message,
          modal,
          message,
        setModal
    }}>
      {children}
    </documentContext.Provider>
  )
}

export default DocumentProvider
