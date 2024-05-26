import React from 'react'
import AuthLayout from '../layout/authLayout'
import { Link } from 'react-router-dom'


const Homepage = () => {
  return (
    <AuthLayout>
     <div style={{height:"90vh", display:"flex", justifyContent:"center", alignItems:"center", gap:"3rem"}}>
        <Link to="/user-login" style={{fontSize:"20px"}}>Login</Link> 
        <Link to="/user-signup" style={{fontSize:"20px"}}>Sign up</Link>
     </div>
    </AuthLayout>
  )
}

export default Homepage
