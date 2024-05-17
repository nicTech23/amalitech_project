import React, { useContext } from 'react'
import "./feeds_search.css"
import { IoIosSearch } from "react-icons/io";
import { feeds_context } from '../../service/feeds_content';
const FeedsSearch = () => {
  const { search_value, search, search_feed, not_found } = useContext(feeds_context)
 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search_feed();
    }
  };

  return (
    <div className='feed-search'>
        <div className='container'>
            <div>Find a product</div>
            <div className='search'>
                <div className='input'>
                    <input type='text' placeholder='I am looking for...' value={search} onChange={search_value} onKeyDown={handleKeyDown}/>
                  </div>
                <IoIosSearch className='search-icon' onClick={()=>search_feed()}/>
            </div>
            {not_found && <div>Noting found</div>}
        </div>
    </div>
  )
}

export default FeedsSearch
