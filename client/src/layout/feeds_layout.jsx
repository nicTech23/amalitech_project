import React from 'react'
import FeedsHeader from '../components/feeds/feeds_header'
import FeedsSearch from '../components/feeds/feeds_search'
import "./feeds_layout.css"
const FeedsLayout = ({children}) => {
  return (
    <section className='feed-layout'>
      <FeedsHeader />
      {children}
    </section>
  )
}

export default FeedsLayout
