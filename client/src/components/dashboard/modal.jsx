import React, { useContext } from 'react'
import "./modal.css"
import { documentContext } from '../../service/document_context'
import { Button } from '@mui/material'
const Modal = () => {
    const { get_document_values, submit_message, setModal } = useContext(documentContext)
    
    // const hideModal = ()=>{
    //     setModal(false)
    // }
  return (
    <section className='modal-box'>
      <div className='add-doc'>
        Add document
      </div>
      
      <div className='forms'>
        <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Select document type</lable>
            <div className='field_box'>
                <select id="type" name="type" onChange={get_document_values} >
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
                <input type='text' name="title" onChange={get_document_values}/>
            </div>
        </div>
        
         <div className='form-div' style={{marginBottom:"20px"}}>
            <lable>Description</lable>
            <div className='field_box'>
                <input type='text' name="description" onChange={get_document_values}/>
            </div>
        </div>
        
         <div className='form-div' style={{marginBottom:"20px"}} onChange={get_document_values}>
            <lable>Upload file</lable>
            <div className='field_box'>
                <input type='file' name="file" accept=".png, .jpeg, .jpg, .pdf"/>
            </div>
        </div>
        
          </div>
          <div style={{width:"100%", textAlign:"center"}}>
              <Button variant='contained' onClick={()=>{submit_message()}}>Submit document</Button>
          </div>
    </section>
  )
}

export default Modal
