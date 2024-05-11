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
    
    const [ error_message, set_error_message ] = useState(null)
    

    // get signUp values from input fields
    const get_login_values = useCallback((e)=>{
        setLogin({...login, [ e.target.name ]: e.target.value })
    },[login])

    // get signUp values from input fields
    const get_signup_values = useCallback((e)=>{
        setSigup({ ...signup, [ e.target.name ]: e.target.value })
    }, [ signup ])
    
    // Hundle to loging
    const login_button = async(e)=>{
       e.preventDefault(); 
        try {
              e.preventDefault(); 
            const response = await axios.post(`http://localhost:8000/api/v1/auth-route/user-login`, login)

            if (response.status === 200) {
                const data = await response.data
                
                console.log(data)
            }

        } catch (error) {
            console.log(error.message)
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
                const data = await response.data.msg
                console.log(data)
                navigate("http://localhost:3000/login")
            }

        } catch (error) {
        
            const errors = error.response.data.msg || error.response.data.errors
            set_error_message(errors)
        
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
                error_message
            }}>
        {children}
    </authContext.Provider>
   )
}

export default AuthProvider
