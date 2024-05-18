import React, { useContext } from 'react'
import "./fields.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Fields = ({data, marginTop, header, autLink, forgetPassword, event, handle}) => {
  const navigate = useNavigate()
  
  return (
    <div className='field' style={{marginTop: `${marginTop}%`}}>
      <div className='heading'>
        <h1>{header}</h1>
        <Link className='auth_link' to={ autLink === "login"? "/": `/${autLink}`}>
            <p>{autLink}</p>
        </Link>
      </div>
      
      <form>
        {
            data?.map((data, index)=>{
                return (
                    <div className='form_div'>
                        <input type={data.type} placeholder={data.placeholder} name={data.name} onChange={event}/>
                    </div>
                )
            })
              }
              
             {
                forgetPassword && (
                <Link to="/forgot-password" className='forgot_password'>
                  <p>{ forgetPassword}?</p>
                </Link>
                )
             }
        </form>
        <button onClick={()=>handle(navigate )} className='auth_btn'>{ header}</button>
    </div>
  )
}





export default Fields
