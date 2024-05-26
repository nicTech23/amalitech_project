
import "./fields.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
const Fields = ({data, marginTop, header, autLink, forgetPassword, event, handle, nav, token}) => {
  const navigate = useNavigate()
  
  return (
    <div className='field' style={{marginTop: `${marginTop}%`}}>
      <div className='heading'>
        <h1>{header}</h1>
        <Link className='auth_link' to={`/${nav}`}>
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
      <Button variant="contained" sx={{
        backgroundColor: "rgb(228, 107, 8);",
        '&:hover': {
            backgroundColor: 'rgb(228, 107, 8);',
            transform: 'scale(1.1)'
        },
        padding: "10px",
        marginTop:"10px"
        }} onClick={()=>handle(navigate, token )} className='auth_btn'>{ header}</Button>
    </div>
  )
}





export default Fields
