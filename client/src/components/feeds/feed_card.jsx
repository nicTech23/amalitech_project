import React, { useContext } from 'react'
import "./feed_card.css"
import IMG from "../../assets/card.avif"
import PDF from "../../assets/Nicholas_CV.pdf"
import { IconButton, Tooltip } from '@mui/material'
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

  console.log(image_url)
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
      <button className='download-btn' onClick={()=>post_download(id)}>Download</button>
      <Tooltip title="message" sx={{backgroundColor:"rgb(211, 107, 23)"}} onClick={()=>modal_control(id, file)}>
        <IconButton>
          <ForwardToInboxIcon/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default FeedCard
