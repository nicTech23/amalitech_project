import { createContext, useCallback, useState} from "react";
import axios from "axios"
export const authContext = createContext(null)

const AuthProvider = ({children}) =>{
   
    const [ login, setLogin ] = useState({
        email: "",
        password:""
    })

    const [ signup, setSigup ] = useState({
        email: "",
        password: "",
        telephone: "",
        last_name: "",
        first_name: "",
        telephone:""
    })
    
    const [ update_password, set_update_password ] = useState({
        password: "",
        confirm_password:""
    })

    const [ forgot_password, set_forgot_password ] = useState({
        email:""
    })
    
    const [ error_message, set_error_message ] = useState(null)
    

    // get signUp values from input fields
    const get_login_values = useCallback((e)=>{
        setLogin({...login, [ e.target.name ]: e.target.value })
    },[login])

    // get signUp values from input fields
    const get_signup_values = useCallback((e)=>{
        setSigup({ ...signup, [ e.target.name ]: e.target.value })
    }, [ signup ])
    
    const get_update_password_value = useCallback( (e)=>{
        set_update_password({ ...update_password, [ e.target.name ]: e.target.value })
         console.log(update_password)
    }, [update_password])
    
    const get_forgot_password_value = useCallback( (e)=>{
        set_forgot_password({ ...forgot_password, [ e.target.name ]: e.target.value })
        console.log(forgot_password)
    },[forgot_password])
    // Hundle to loging


    const login_button = async(navigate)=>{
        const body = {
            email: login.email,
            password:login.password
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/auth-route/user-login`, body, {withCredentials:true})

            if (response.status === 200) {
                const data = await response.data
                console.log(data)
                setLogin({email: "", password:""})
                navigate()
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


    const signup_button = async(navigate)=>{
        const body = {
            first_name: signup.first_name,
            last_name: signup.last_name,
            email: signup.email,
            telephone: signup.telephone,
            password: signup.password
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/auth-route/register`, body)

            if (response.status === 200) {
                 console.log("navigate")
                navigate("/login")
                setSigup({})
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

    const forgot_password_button = async (navigate)=>{
        const body = {
            email: forgot_password.email
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/auth-route/forgot-password`, body, {withCredentials:true})
            if (response.status === 200) {
                const data = await response.data
                console.log(data)
                navigate("/update-password")
                set_forgot_password({})
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

    const update_password_button = async(navigate)=>{
        const body = {
            password: update_password.password,
            confirm_password: update_password.confirm_password
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/v1/auth-route/update-password`, body, { withCredentials: true })
             if (response.status === 200) {
                const data = await response.data
                 console.log(data)
                 set_update_password({})
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
        <authContext.Provider value={{
                get_login_values,
                get_signup_values,
                login_button,
                signup_button,
                error_message,
                get_forgot_password_value,
                get_update_password_value,
                forgot_password_button,
                update_password_button
            }}>
        {children}
    </authContext.Provider>
   )
}

export default AuthProvider
