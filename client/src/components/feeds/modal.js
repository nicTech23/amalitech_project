import React from 'react'
import "./modal.css"
const Modal = () => {
  return (
    <section className='feed-modal'>
        <div style={{position:"absolute",top:"25%", right:"23%", fontWeight:"700", fontSize:"20px", cursor:"pointer"}}>X</div>
      <div className='feed-modal-box'>
        <h1>Send Email</h1>
        <div style={{width:"100%"}}>
            <section style={{width:"100%", marginBottom:"15px"}}>
                <label>Title</label>
                <section>
                    <input type='text' style={{width:"100%", height:"40px", border:"1px solid rgb(211, 107, 23)"}}/>
                </section>
            </section>
            <section style={{width:"100%"}}>
                <label>Body</label>
                <section>
                    <textarea type='text' style={{width:"100%", height:"80px", border:"1px solid rgb(211, 107, 23)", outline:"none", padding:"10px"}}/>
                </section>
            </section>
        </div>
        <div style={{width: "100%", textAlign:"center", marginTop:"1rem"}}>
            <button style={{width:"150px", height:"40px", border:"none", backgroundColor:"rgb(211, 107, 23)", color:"white", cursor:"pointer"}}>Send</button>
        </div>
      </div>
    </section>
  )
}

export default Modal
