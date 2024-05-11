import React, { useContext } from 'react'
import AuthLayout from '../../layout/authLayout'
import Fields from '../../components/fields'
import { authContext } from '../../service/auth_context/authContext'

const Signup = () => {
    const { get_signup_values, signup_button} = useContext(authContext)
    
  return (
    <AuthLayout>
          <Fields data={data} marginTop={5} header="SignUp" autLink="login" forgetPassword={null} event={get_signup_values} handle={signup_button} />
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


export default Signup
