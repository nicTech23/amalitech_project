import React from 'react'
import "./feeds_header.css"
import { Link } from 'react-router-dom'
const FeedsHeader = () => {
  return (
    <section className='feeds-header'>
        <div className='feeds-header-container'>
            <div className='logo'>
                Lizzy Shop
            </div>
            <nav>
                <Link className='nav'>Weeding Card</Link>
                <Link className='nav'>University Forms</Link>
                <Link className='nav'>Government Forms</Link>
            </nav>
            
            <div className='logout'>
                  <div>N</div>
                  <Link className='out'>Logout</Link>
            </div>
        </div>
    </section>
  )
}

export default FeedsHeader
