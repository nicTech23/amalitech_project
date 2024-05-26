import React, { useContext } from 'react'
import FeedsHeader from '../components/feeds/feeds_header'
import "./feeds_layout.css"
import { Alert, AlertTitle, Stack } from '@mui/material'
import { feeds_context } from '../service/feeds_content'
const FeedsLayout = ({children}) => {
  const {feed_error } = useContext(feeds_context)
  return (
    <section className='feed-layout'>

      {(feed_error) && (
        <Stack sx={{width:"50%", position:"absolute", right:"0", top:"12%"}}>
          <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {feed_error}
            </Alert>
        </Stack>
      )}
      <FeedsHeader />
      {children}
    </section>
  )
}

export default FeedsLayout
