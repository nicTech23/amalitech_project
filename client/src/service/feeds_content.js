import { createContext, useState } from "react";
import axios from "axios"


export const feeds_context = createContext(null)



const FeedProvider = ({children}) => {
  const [ feed, set_feed ] = useState(null)
  
  const [ modal, setModal ] = useState(false)
  
  const [ feed_id, set_feed_id ] = useState(null)
  const [feed_error, set_feed_error] = useState(null)

  const [ email, set_email ] = useState({
    body: "", 
    title:""
  })
  
  const [ search, set_search ] = useState("")

  const [not_found, set_not_found] = useState(false)
  
    const get_all_feeds = async()=>{
       try {
         const response = await axios.get("http://localhost:8000/api/v1/document-route/get-all-files")
        const data = response.data.msg?.reverse()
        console.log(data)
        set_feed(data)
       } catch (error) {
        set_feed_error(error?.response?.data.msg || error?.response?.data.errors || error.message)
       }
    }

  const modal_control = (id)=>{
    setModal(!modal)
    set_feed_id(id)
    console.log(id)
  }

  const get_message = (e)=>{
    set_email({ ...email, [ e.target.name ]: e.target.value })
  }
  
 
  const post_message = async()=>{
    const body = {
      title: email.title,
      body: email.body
    }
    try {
      const user_id = localStorage.getItem("user")
      console.log(user_id)
      const response = await axios.post(`http://localhost:8000/api/v1/message-route/send-message/${feed_id}/${user_id}`, body)
      if(response.status === 200){
        setModal(!modal)
        set_email({body:"", title:""})
      }
    } catch (error) {
      set_feed_error(error?.response?.data.msg || error?.response?.data.errors || error.message)
    }
  }

  const post_download = async(feed_id)=>{
    try {
      const user_id = localStorage.getItem("user")
      const response = await axios.post(`http://localhost:8000/api/v1/download-route/insert-download-file/${feed_id}/${user_id}`)
      console.log("data", response.data)
    } catch (error) {
      set_feed_error(error?.response?.data.msg || error?.response?.data.errors || error.message)
    }
  }
  
  const search_value = (e)=>{
    set_search(e.target.value)
    console.log(search)
  }
  const search_feed = async ()=>{
    try {
      if (search !=="") {
        const response = await axios.get(`http://localhost:8000/api/v1/document-route/search-file?search=${search}`)
      const data = await response.data
        if (data?.msg !== "No files found") {
          set_feed(data?.msg)
        } else {
          set_not_found(true)
          const timer = setInterval(()=>{
            set_not_found(false)
          }, [2000])

          setTimeout(() => {
            clearInterval(timer)
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <feeds_context.Provider value={{
      feed, get_all_feeds,
      modal,
      setModal,
      modal_control,
      post_message,
      get_message,
      post_download,
      search_value,
      search,
      search_feed,
      not_found, 
    }}>
      {children}
    </feeds_context.Provider>
  )
}

export default FeedProvider
