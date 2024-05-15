import React from 'react'
import "./feeds_search.css"
import { IoIosSearch } from "react-icons/io";
const FeedsSearch = () => {
  return (
    <div className='feed-search'>
        <div className='container'>
            <div>Find a product</div>
            <div className='search'>
                <div className='input'>
                    <input type='text' placeholder='I am looking for...'/>
                  </div>
                <IoIosSearch className='search-icon'/>
            </div>
        </div>
    </div>
  )
}

export default FeedsSearch
