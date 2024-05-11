import React, { useContext } from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/fields'
import { authContext } from '../../service/auth_context/authContext'
import AuthProvider from '../../service/auth_context/authContext'
const Login = () => {      
  const { get_login_values, login_button } = useContext(authContext)
  
  return (
    <AuthProvider>
    <AuthLayout>
      <Fields data={data} marginTop={8} header="Login" autLink="Signup"forgetPassword="forgot password" event={get_login_values} handle={login_button} />
    </AuthLayout>
    </AuthProvider>
  )
}

const data = [
    {
        id: 0,
        type: "email",
        name: "email",
        placeholder:"Email"
    },
    {
        id: 0,
        type: "password",
        name: "password",
        placeholder:"Password"
    }
]

export default Login
