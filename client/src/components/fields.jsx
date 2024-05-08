import React from 'react'
import "./fields.css"
import { Link } from 'react-router-dom'
const Fields = ({data, marginTop, header, autLink, forgetPassword, event}) => {
  return (
    <div className='field' style={{marginTop: `${marginTop}rem`}}>
      <div className='heading'>
        <h1>{header}</h1>
        <Link className='auth_link' to={`/${autLink}`}>
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
                <Link className='forgot_password'>
                  <p>{ forgetPassword}?</p>
                </Link>
                )
             }

              <button className='auth_btn'>{ header}</button>
        </form>
    </div>
  )
}





export default Fields