import React from 'react'
import "./feed_card.css"
import IMG from "../../assets/card.avif"
import PDF from "../../assets/Nicholas_CV.pdf"
import { IconButton, Tooltip } from '@mui/material'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';



const FeedCard = ({title, description, file, id}) => {
  const handleDownloadClick = () => {
    // Replace 'example.pdf' with the URL or path to your CV file
    const cvUrl = PDF; //url of image
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', 'CV.pdf'); // Specify the filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className='card'>
      <div className='image'>
        {/* <img src={IMG} alt='img'/> */}
        <embed src={PDF} type="application/pdf" width="100%" height="100%" className='embed' />
      </div>
      <div className='title'>{title }</div>
      <div className='description'>
        <p>{description }</p>
      </div>
      <button className='download-btn' onClick={handleDownloadClick}>Download</button>
      <Tooltip title="message" sx={{backgroundColor:"rgb(211, 107, 23)"}}>
        <IconButton>
          <ForwardToInboxIcon/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default FeedCard
