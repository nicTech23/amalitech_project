import React, { useContext } from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'
import { adminContext } from '../../service/auth_context/admin_context'

const AdminSignup = () => {
    const {get_admin_signup_values, admin_signup_button} = useContext(adminContext)
  return (
     <AuthLayout>
        <Fields data={data} marginTop={7} header="SignUp as Admin" autLink="login as admin" forgetPassword={null} event={get_admin_signup_values} handle={admin_signup_button} nav={"admin-login"} />
    </AuthLayout>
  )
}

const data = [
    {
        id: 0,
        type: "text",
        name: "name",
        placeholder:"Name"
    },
    {
        id: 2,
        type: "email",
        name: "email",
        placeholder:"Email"
    },
    {
        id: 3,
        type: "password",
        name: "password",
        placeholder:"Password"
    },
]

export default AdminSignup
