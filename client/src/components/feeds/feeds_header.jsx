import React, { useContext } from 'react'
import "./feeds_header.css"
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../service/auth_context/authContext'
const FeedsHeader = () => {
  const { handle_logout } = useContext(authContext)
  const navigate = useNavigate()
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
                  <Link className='out' onClick={()=>handle_logout(navigate)}>Logout</Link>
            </div>
        </div>
    </section>
  )
}

export default FeedsHeader
