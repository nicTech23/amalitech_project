import React, { useContext } from 'react'
import { authContext } from '../../service/auth_context/authContext'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'
import { useParams } from 'react-router-dom'
const UpdatePassword = () => {
  const { get_update_password_value, update_password_button } = useContext(authContext)
  const { token } = useParams()
  
  return (
      <AuthLayout>
      <Fields data={data} marginTop={8} header="Change password" autLink="login" forgetPassword={null} event={get_update_password_value} handle={update_password_button} nav={"user-login"} token={token} />
      </AuthLayout>
  )
}


const data = [
    {
        id: 0,
        type: "password",
        name: "password",
        placeholder:"New password"
    },
    {
        id: 1,
        type: "password",
        name: "confirm_password",
        placeholder:"Confirm password"
    },
]
export default UpdatePassword
