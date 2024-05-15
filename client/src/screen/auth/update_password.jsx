import React, { useContext } from 'react'
import AuthProvider, { authContext } from '../../service/auth_context/authContext'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'
const UpdatePassword = () => {
const {get_update_password_value, update_password_button} = useContext(authContext)
  return (
      <AuthLayout>
        <Fields data={data} marginTop={8} header="Change password" autLink="login" forgetPassword={null} event={get_update_password_value} handle={update_password_button} />
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
