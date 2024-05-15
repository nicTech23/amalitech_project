import React, { createContext, useState } from 'react'


export const documentContext = createContext(null)
const DocumentProvider = ({children}) => {
    const [ document, setDocument ] = useState({
        title: "",
        description: "",
        type: "",
        file:""
    })
    
    const [message, setMessage] = useState()
    console.log()


    const get_document_values = (e)=>{
        if(e.target.name === "file"){
            setDocument({...document, [e.target.name]:e.target.files[0]})
        } else {
             setDocument({...document, [e.target.name]:e.target.value})
        }

        console.log(document)
    }

    const submit_message = ()=>{
        if (Object.values(document).includes("")) {
            
        }
    }

  return (
    <documentContext.Provider value={{
        get_document_values,
    }}>
      {children}
    </documentContext.Provider>
  )
}

export default DocumentProvider
