import React, { useContext } from 'react'
import "./feed_card.css"
import { Button, IconButton, Tooltip } from '@mui/material'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { feeds_context } from '../../service/feeds_content'



const FeedCard = ({title, description, file, id}) => {
  const {modal_control, post_download} = useContext(feeds_context)
  
  const handleDownloadClick = () => {
    // Replace 'example.pdf' with the URL or path to your CV file
    const cvUrl = `http://localhost:8000/files/${file}`; //url of image
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', file); // Specify the filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  let image_url = `http://localhost:8000/files/${file}`

 
  return (
    <div className='card'>
      <div className='image'>
        {file.endsWith(".pdf") ? (
          <embed src={image_url} type="application/pdf" width="100%" height="100%" className='embed' />
        ) : (
            <img src={image_url} alt='img'/>
        )}
       
      </div>
      <div className='title'>{title }</div>
      <div className='description'>
        <p>{description }</p>
      </div>
      <button className='download-btn' onClick={()=>post_download(id, file)}>Download</button>
      <div style={{backgroundColor:"rgb(211, 107, 23)", width:"50% ", borderTopRightRadius:"16px", borderBottomRightRadius:"16px"}} onClick={()=>modal_control(id, file)}>
          <Button download={image_url} sx={{ m: 1,backgroundColor:"rgb(211, 107, 23)" , color:"white"}}>Send to email</Button>
      </div>
  
    </div>
  )
}

export default FeedCard
