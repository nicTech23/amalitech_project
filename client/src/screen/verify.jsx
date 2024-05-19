import React, { useContext } from 'react'
import AuthLayout from '../layout/authLayout'
import { authContext } from '../service/auth_context/authContext'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const {handle_verify, verify} = useContext(authContext)
  return (
    <AuthLayout>
     <div style={{width:"100%", height:"100vh", textAlign:"center"}} onClick={()=>handle_verify(navigate, token)}>
              <button style={{ marginTop: "5rem", fontSize: "18px", padding: "5px", }}>{verify }</button>
     </div>
    </AuthLayout>
  )
}

export default Verify
