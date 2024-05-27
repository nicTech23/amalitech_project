import { createContext, useCallback, useState } from "react";
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
    })
    
    const [ update_password, set_update_password ] = useState({
        password: "",
        confirm_password:""
    })

    const [ forgot_password, set_forgot_password ] = useState({
        email:""
    })
    
    const [ error_message, set_error_message ] = useState(false)

    const [register, set_register] = useState("Sign up as a user")
    
    const [ verify, set_verify ] = useState("Verify")
    
    const [reset_message, set_reset_message] = useState(false)
    const [verify_message, set_verify_message] = useState(false)
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
            const response = await axios.post(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route/user-login`, body, {withCredentials:true})
                const data = await response.data
                // console.log("my data", data)
                // const {token} = await data
                // Cookies.set('user_token', token, { expires: 7 })
                localStorage.setItem("user", data.data)
                setLogin({email: "", password:""})
                navigate("/feeds")
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
            set_register("Registaring...")
            const response = await axios.post(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route/register`, body, {withCredentials:true})
            set_verify_message(true)
            if (response.status === 200) {
                console.log("navigate")
                navigate("/user-login")
                set_register("Sign up as a user")
                setSigup({})
            }

            const verify_time_interval = setInterval(()=>{
                   set_verify_message(false)
               }, [ 9000 ])
                
                setTimeout(() => {
                    clearInterval(verify_time_interval);
                }, 10000);

        } catch (error) {
            const errors = error?.response?.data.msg || error?.response?.data.errors || error.message
            set_error_message(errors)
            set_register("Sign up as a user")
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
            const response = await axios.post(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route/forgot-password`, body, {withCredentials:true})
            set_reset_message(true)
            if (response.status === 200) {
                const data = await response.data
                console.log(data)
                set_forgot_password({})
            }
            const reset_time_interval = setInterval(()=>{
                   set_reset_message(false)

               }, [ 8000 ])
                
                setTimeout(() => {
                    clearInterval(reset_time_interval);
                }, 10000);
            
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

    const update_password_button = async(navigate, token)=>{
        const body = {
            password: update_password.password,
            confirm_password: update_password.confirm_password
        }

        try {
            const response = await axios.put(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route/update-password/${token}`, body, {withCredentials:true})
             if (response.status === 200) {
                const data = await response.data
                 console.log(data)
                 set_update_password({ password: "", confirm_password: "" })
                 navigate("/user-login")
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
    const handle_verify = async (navigate, token)=>{
        try {
             set_verify("Verifying...")
            const response = await axios.get(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route//verify-account/${token}`)
            const data = await response.data
            if (data) {
                navigate("/user-login")
                set_verify("Verify")
            }
        } catch (error) {
             const errors = error?.response?.data.msg || error?.response?.data.errors || error.message
             set_error_message(errors)
            // console.log(errors)
            set_verify("Verify failed")
            if (errors) {
               const error_time_interval = setInterval(()=>{
                   set_error_message(null)
                    set_verify("Verify")
               }, [ 5000 ])
                
                setTimeout(() => {
                    clearInterval(error_time_interval);
                }, 10000);
            }  
        }
    }

    const handle_logout = async (navigate)=>{
        try {
            const response = await axios.get(`https://amalitech-project-server.onrender.com/api/v1/user_auth-route/logout/`, { withCredentials: true })
            localStorage.removeItem("user")
            navigate("/user-login")
        } catch (error) {
            console.log(error)
             const errors = error?.response?.data.msg || error?.response?.data.errors || error.message
             set_error_message(errors)
            // console.log(errors)
            set_verify("Verify failed")
            if (errors) {
               const error_time_interval = setInterval(()=>{
                   set_error_message(null)
                    set_verify("Verify")
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
                update_password_button,
                handle_verify,
                verify,
                register,
            handle_logout,
            reset_message,
                verify_message
            }}>
        {children}
    </authContext.Provider>
   )
}

export default AuthProvider
