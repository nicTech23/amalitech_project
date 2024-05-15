import React, { useContext } from 'react'
import AuthProvider, { authContext } from '../../service/auth_context/authContext'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'
import "./auth.css"
const ForgetPassword = () => {
  const { get_forgot_password_value, forgot_password_button  } = useContext(authContext)
  
  return (
      <AuthLayout>
        <Fields data={data} marginTop={8} header="forgot password" autLink="login" forgetPassword={null} event={get_forgot_password_value} handle={forgot_password_button } />
      </AuthLayout>
  )
}

const data = [
    {
        id: 0,
        type: "email",
        name: "email",
        placeholder:"Your email"
    },
]

export default ForgetPassword
