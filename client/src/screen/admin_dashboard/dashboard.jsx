import React, { useContext, useEffect } from 'react'
import "./dashboard.css"
import Button from '@mui/material/Button';
import Table from "../../components/dashboard/table"
import Modal from '../../components/dashboard/modal';
import { documentContext } from '../../service/document_context';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { modal , setModal, message} = useContext(documentContext)
  const navigate = useNavigate()

  const modalControl = ()=>{
    setModal(!modal)
  }

  const admin = localStorage.getItem("admin")

  useEffect(()=>{
    if (!admin) {
    navigate("/admin-login")
  }
  }, [])

  console.log("my", admin)
  return (
      <section className='dashboard'>
        <div className='header'>
          <div className='admin'>
            Admin Dashboard
          </div>
          <Button variant="contained" onClick={()=>modalControl()}>Add file</Button>
        </div>
        {message && (
           <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        )}
        <section className='table'>
          <Table/>
        </section>
        { modal && (
          <div className='modal-container'>
            <div onClick={()=>modalControl()} style={{position:'absolute', top:"17%", right:"18%", fontWeight:"bold", fontSize:"25px", color:"red", zIndex:"3", cursor:"pointer"}}>X</div>
             <section className='modal'>
                <Modal/>
              </section>
          </div>
         
        )}
      </section>
  )
}

export default Dashboard
