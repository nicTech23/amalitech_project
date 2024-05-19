import React from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/auth/fields'

const AdminSignup = () => {
  return (
     <AuthLayout>
        <Fields data={data} marginTop={7} header="SignUp as Admin" autLink="login as admin" forgetPassword={null} event={null} handle={null} />
    </AuthLayout>
  )
}

const data = [
    {
        id: 0,
        type: "text",
        name: "first_name",
        placeholder:"First name"
    },
    {
        id: 1,
        type: "text",
        name: "last_name",
        placeholder:"Last name"
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
    {
        id: 4,
        type: "text",
        name: "telephone",
        placeholder:"Telephone"
    },
]

export default AdminSignup
