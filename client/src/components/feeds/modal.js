import React, { useContext } from 'react'
import "./modal.css"
import { feeds_context } from '../../service/feeds_content'
import { Alert, AlertTitle, Stack } from '@mui/material'
const Modal = () => {
  const {modal_control, post_message, get_message, feed_error, send} = useContext(feeds_context)
  return (
    <section className='feed-modal'>
      {feed_error && (
         <Stack sx={{width:"50%", position:"absolute", right:"0", top:"12%"}}>
          <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {feed_error}
            </Alert>
        </Stack>
      )}
        <div onClick={()=>modal_control()} style={{position:"absolute",top:"25%", right:"23%", fontWeight:"700", fontSize:"20px", cursor:"pointer"}}>X</div>
      <div className='feed-modal-box'>
        <h1>Send Email</h1>
        <div style={{ width: "100%" }}>
          <section style={{width:"100%", marginBottom:"15px"}}>
                <label>To</label>
                <section>
                    <input onChange={get_message} type='text' name='recipient' placeholder='Recipient email' style={{width:"100%", height:"40px", border:"1px solid rgb(211, 107, 23)"}}/>
                </section>
            </section>
            <section style={{width:"100%", marginBottom:"15px"}}>
                <label>Subject</label>
                <section>
                    <input onChange={get_message} type='text' name='subject' placeholder='subject' style={{width:"100%", height:"40px", border:"1px solid rgb(211, 107, 23)"}}/>
                </section>
            </section>
            <section style={{width:"100%"}}>
                <label>Body</label>
                <section>
                    <textarea onChange={get_message} type='text' name='body' placeholder='email' style={{width:"100%", height:"80px", border:"1px solid rgb(211, 107, 23)", outline:"none", padding:"10px"}}/>
                </section>
            </section>
        </div>
        <div style={{width: "100%", textAlign:"center", marginTop:"1rem"}}>
          <button onClick={() => post_message()} style={{ width: "150px", height: "40px", border: "none", backgroundColor: "rgb(211, 107, 23)", color: "white", cursor: "pointer" }}>{ send}</button>
        </div>
      </div>
    </section>
  )
}

export default Modal
