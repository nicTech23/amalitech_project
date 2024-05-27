import React, {useContext } from 'react'
import "./autLayout.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { authContext } from '../service/auth_context/authContext';
import { adminContext } from '../service/auth_context/admin_context';

const AuthLayout = ({children}) => {
  const { error_message, reset_message, verify_message } = useContext(authContext)
  const { admin_error_message } = useContext(adminContext)
  console.log("error", error_message)
  return (
    <section className='auth-layout'>
      <section className='auth-header'>
        <a href='/'>Lizzy Distribution</a>
      </section>

      {reset_message && (
         <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
            A reset password link has sent to your email
         </Alert>
      )}
     
      {verify_message && (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
            Verification link has sent to your email
         </Alert>
      )}

      {(error_message || admin_error_message) && (
        <Stack sx={{width:"50%", position:"absolute", right:"0", top:"12%"}}>
          <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error_message || admin_error_message}
            </Alert>
        </Stack>
      )}
        {children}
    </section>
  )
}

export default AuthLayout
