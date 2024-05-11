import React from 'react'
import "./autLayout.css"
import AuthProvider from '../service/auth_context/authContext'
const AuthLayout = ({children}) => {
  return (
    <section className='auth-layout'>
      <AuthProvider>
        {children}
      </AuthProvider>
    </section>
  )
}

export default AuthLayout
