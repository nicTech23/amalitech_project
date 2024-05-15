import React from 'react'
import "./feed_card.css"
import IMG from "../../assets/card.avif"
const FeedCard = () => {
  return (
    <div className='card'>
      <div className='image'>
        <img src={IMG} alt='img'/>
      </div>
      <div className='title'>Drake weeding Card</div>
      <div className='description'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi facilis mollitia.
      </div>
      <button className='download-btn'>Download</button>
    </div>
  )
}

export default FeedCard
