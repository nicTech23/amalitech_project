import React, { useContext, useEffect } from 'react'
import FeedsLayout from '../../layout/feeds_layout'
import FeedsSearch from '../../components/feeds/feeds_search'
import FeedCard from '../../components/feeds/feed_card'
import "./feeds.css"
import Modal from '../../components/feeds/modal'
import { feeds_context } from '../../service/feeds_content'
const Feeds = () =>
{
  const {feed, get_all_feeds } = useContext(feeds_context)
  

  useEffect(()=>{
    get_all_feeds()
  },[])
  return (
    <FeedsLayout>
       <Modal/>
      <FeedsSearch/>
      <div className='cards'>
        {feed && feed?.map((data, index)=>{
          return (
            <FeedCard key={data._id} title={data.title} description={data.description} file={data.file} id={data._id } />
          )
        })}
       
      </div>
    </FeedsLayout>
  )
}

export default Feeds
