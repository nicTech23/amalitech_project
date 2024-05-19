import React from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'

const AdminLogin = () => {
  return (
     <AuthLayout>
          <Fields data={data} marginTop={8} header="Login as Admin" autLink="Signup as Admin" forgetPassword="" event={null} handle={null} />
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
