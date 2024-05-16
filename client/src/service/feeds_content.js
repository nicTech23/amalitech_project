import { createContext, useState } from "react";
import axios from "axios"


export const feeds_context = createContext(null)



const FeedProvider = ({children}) => {
    const [ feed, set_feed ] = useState(null)
    
    const get_all_feeds = async()=>{
        const response = await axios.get("http://localhost:8000/api/v1/document-route/get-all-files")
        const data = response.data.msg
        console.log(data)
        set_feed(data)
    }

  return (
    <feeds_context.Provider value={{feed, get_all_feeds}}>
      {children}
    </feeds_context.Provider>
  )
}

export default FeedProvider
