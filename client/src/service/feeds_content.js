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
    title: "",
    recipient:""
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

  const modal_control = (id, file_name )=>{
    setModal(!modal)
    set_feed_id(id)
    localStorage.setItem("file_name", file_name )
  }

  const get_message = (e)=>{
    set_email({ ...email, [ e.target.name ]: e.target.value })
  }
  
 
  const post_message = async()=>{
    const file_name = localStorage.getItem("file_name")
    
    const body = {
      title: email.title,
      body: email.body,
      recipient: email.recipient,
      file_name 
    }
    try {
      const user_id = localStorage.getItem("user")
      console.log(user_id)
      const response = await axios.post(`http://localhost:8000/api/v1/message-route/send-message/${feed_id}/${user_id}`, body)
      if(response.status === 200){
        setModal(!modal)
        set_email({body:"", title:"", recipient:""})
      }
    } catch (error) {
      set_feed_error(error?.response?.data.msg || error?.response?.data.errors || error.message)
    }
  }

  const post_download = async(feed_id, file)=>{
    try {
      console.log("file", file)
      const user_id = localStorage.getItem("user")
      const response = await axios.get(`http://localhost:8000/api/v1/auth-route/download-file/${feed_id}/${file}/${user_id}`,  {
                responseType: 'blob', // Important for handling file downloads
            })
    
      // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file); // Set the file name

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);

        console.log("File download triggered");
    } catch (error) {
      set_feed_error(error?.response?.data.msg || error?.response?.data.errors || error.message)
    }
  }
  
  const search_value = (e)=>{
    set_search(e.target.value)
    if (e.target.value === "") {
      get_all_feeds()
    }
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
