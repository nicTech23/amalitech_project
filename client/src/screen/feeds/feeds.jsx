import React from 'react'
import FeedsLayout from '../../layout/feeds_layout'
import FeedsSearch from '../../components/feeds/feeds_search'
import FeedCard from '../../components/feeds/feed_card'
import "./feeds.css"
const Feeds = () => {
  return (
    <FeedsLayout>
      <FeedsSearch/>
      <div className='cards'>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>
    </FeedsLayout>
  )
}

export default Feeds
