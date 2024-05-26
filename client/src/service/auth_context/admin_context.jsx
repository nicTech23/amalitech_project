import { createContext, useCallback, useState} from "react";
import axios from "axios"
import Cookies from 'js-cookie';

export const adminContext = createContext(null)




const AdminProvider = ({children}) => {
    
    const [ admin_login, set_admin_login ] = useState({
        email: "",
        password:""
    })

     const [ admin_signup, set_admin_sigup ] = useState({
        email: "",
        password: "",
        name: "",
     })
    
    const [ admin_error_message, set_error_message ] = useState(null)
      const get_admin_login_values = useCallback((e)=>{
            set_admin_login({...admin_login, [ e.target.name ]: e.target.value })
        },[admin_login])

    const get_admin_signup_values = useCallback((e)=>{
        set_admin_sigup({ ...admin_signup, [ e.target.name ]: e.target.value })
    }, [admin_signup])

    const admin_login_button = async(navigate)=>{
        const body = {
            email: admin_login.email,
            password:admin_login.password
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/admin-route/admin-login`, body, {withCredentials:true})
            const data = await response.data
            console.log("my data", data)
            const {token} = await data
            Cookies.set('admin_token', token, { expires: 7 })
            if (response.status === 200) {
                const data = await response.data
                const id = await response.data.data
                localStorage.setItem("user", data.data)
                set_admin_login({ email: "", password: "" })
                localStorage.setItem("admin", id)
                navigate("/admin-dashboard")
            }

        } catch (error) {
            const errors = error?.response?.data.msg || error?.response?.data.errors || error.message
            set_error_message(errors)
            console.log(error)
            if (errors) {
               const error_time_interval = setInterval(()=>{
                   set_error_message(null)

               }, [ 5000 ])
                
                setTimeout(() => {
                    clearInterval(error_time_interval);
                }, 10000);
            
            }  
        }
        
    }



const admin_signup_button = async(navigate)=>{
        const body = {
            name: admin_signup.name,
            email: admin_signup.email,
            password: admin_signup.password
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/admin-route/register-admin`, body)

            if (response.status === 200) {
                 console.log("navigate")
                navigate("/admin-login")
                set_admin_sigup({}) 
            }

        } catch (error) {
            const errors = error?.response?.data.msg || error?.response?.data.errors || error.message
            set_error_message(errors)
            console.log(errors)
            if (errors) {
               const error_time_interval = setInterval(()=>{
                   set_error_message(null)

               }, [ 5000 ])
                
                setTimeout(() => {
                    clearInterval(error_time_interval);
                }, 10000);
            
            }  
        }
    }


  return (
    <adminContext.Provider value={{
        get_admin_login_values,
        get_admin_signup_values, 
        admin_login_button,
        admin_signup_button,
        admin_error_message,
    }}>
      {children}
    </adminContext.Provider>
  )
}

export default AdminProvider
