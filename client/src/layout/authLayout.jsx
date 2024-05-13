import React, {useContext } from 'react'
import "./autLayout.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { authContext } from '../service/auth_context/authContext';

const AuthLayout = ({children}) => {
  const { error_message } = useContext(authContext)
  console.log("error", error_message)
  return (
    <section className='auth-layout'>
      <section className='auth-header'>
        <h1>Lizzy Shop</h1>
      </section>

      {error_message && (
        <Stack sx={{width:"50%", position:"absolute", right:"0", top:"12%"}}>
          <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error_message}
            </Alert>
        </Stack>
      )}
        {children}
    </section>
  )
}

export default AuthLayout
