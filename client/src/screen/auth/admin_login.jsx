import React, { useContext } from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'
import { adminContext } from '../../service/auth_context/admin_context'

const AdminLogin = () => {
  const { get_admin_login_values, admin_login_button } = useContext(adminContext)
  
  return (
     <AuthLayout>
          <Fields data={data} marginTop={8} header="Login as Admin" autLink="Signup as Admin" forgetPassword="" event={get_admin_login_values} handle={admin_login_button} nav={"admin-signup"} token={null} />
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
export default AdminLogin
