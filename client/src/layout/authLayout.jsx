import React from 'react'
import "./autLayout.css"
const AuthLayout = ({children}) => {
  return (
    <section className='auth-layout'>
      {children}
    </section>
  )
}

export default AuthLayout
