import { createContext, useCallback, useState} from "react";

export const authContext = createContext(null)

const AuthProvider = ({children}) =>{
   
    const [ login, setLogin ] = useState({
        email: "",
        passwor:""
    })
    const [ signup, setSigup ] = useState({
        email: "",
        passwor: "",
        telephone: "",
        last_name: "",
        first_name:""
    })
    
    // get signUp values from input fields
    const get_login_values = useCallback((e)=>{
        setLogin({...login, [ e.target.name ]: e.target.value })
    },[login])

    // get signUp values from input fields
    const get_signup_values = useCallback((e)=>{
        setSigup({...signup, [e.target.name]: e.target.value })
    },[signup])

    return (
        <authContext.Provider value={{
                get_login_values,
                get_signup_values
            }}>
        {children}
    </authContext.Provider>
   )
}

export default AuthProvider
