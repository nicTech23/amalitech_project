import React from 'react'
import "./modal.css"
const Modal = () => {
  return (
    <section className='modal-box'>
      <div className='add-doc'>
        Add document
      </div>
      
      <div className='forms'>
        <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Select document type</lable>
            <div className='field_box'>
                <select id="type" name="type">
                    <option value="Select">Select</option>
                    <option value="Wedding card">Weding card</option>
                    <option value="Universit form">University forms</option>
                    <option value="Government form">Government form</option>
                    <option value="Other form">Other form</option>
                </select>
            </div>
        </div>
        
        <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Title</lable>
            <div className='field_box'>
                <input type='text'/>
            </div>
        </div>
        
         <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Description</lable>
            <div className='field_box'>
                <input type='text'/>
            </div>
        </div>
        
         <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Upload file</lable>
            <div className='field_box'>
                <input type='file'/>
            </div>
        </div>
        
      </div>
    </section>
  )
}

export default Modal
