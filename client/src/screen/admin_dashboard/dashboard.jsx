import React from 'react'
import "./dashboard.css"
import Button from '@mui/material/Button';
import Table from "../../components/dashboard/table"
import Modal from '../../components/dashboard/modal';
import DocumentProvider from '../../service/document_context';
const Dashboard = () => {
  return (
    <DocumentProvider>
      <section className='dashboard'>
        <div className='header'>
          <div className='admin'>
            Admin Dashboard
          </div>
          <Button variant="contained">Add file</Button>
        </div>
        <section className='table'>
          <Table/>
        </section>
        <section className='modal'>
          <Modal/>
        </section>
      </section>
    </DocumentProvider>
  )
}

export default Dashboard
