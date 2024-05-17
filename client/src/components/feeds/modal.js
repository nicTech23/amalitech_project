import React, { useContext } from 'react'
import "./modal.css"
import { feeds_context } from '../../service/feeds_content'
const Modal = () => {
  const {modal_control, post_message, get_message} = useContext(feeds_context)
  return (
    <section className='feed-modal'>
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
                <label>Title</label>
                <section>
                    <input onChange={get_message} type='text' name='title' placeholder='title' style={{width:"100%", height:"40px", border:"1px solid rgb(211, 107, 23)"}}/>
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
            <button onClick={()=>post_message()}  style={{width:"150px", height:"40px", border:"none", backgroundColor:"rgb(211, 107, 23)", color:"white", cursor:"pointer"}}>Send</button>
        </div>
      </div>
    </section>
  )
}

export default Modal
