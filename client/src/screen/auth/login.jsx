import React, { useContext } from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/fields'
import { authContext } from '../../service/auth_context/authContext'
const Login = () => {
    const {get_login_values} = useContext(authContext)
  return (
    <AuthLayout>
      <Fields data={data} marginTop={10} header="Login" autLink="Signup"forgetPassword="forgot password" event={get_login_values} />
    </AuthLayout>
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