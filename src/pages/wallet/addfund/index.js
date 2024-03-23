import { Button, Card, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

function AddFund() {
  return (
    <Card sx={{ padding: '20px', width: '50%' }}>
      <Typography style={{ margin: '10px 0 5px 0' }}>Add Balance In User Wallet</Typography>
      <Typography style={{ margin: '10px 0 5px 0' }}>User List</Typography>

      <Select
        style={{ margin: '10px 0 5px 0', width: '100%' }}
        //   value={selectedMarketTimeValue} onChange={handleMarketTimeChange}
      >
        <MenuItem value={0}>-- Select Market time --</MenuItem>
        <MenuItem value='OPEN'>Open Market</MenuItem>
        <MenuItem value='CLOSE'>Close Market</MenuItem>
      </Select>

      <Typography style={{ margin: '10px 0 5px 0', width: '100%' }}>Amount</Typography>
      <TextField
        type='number'
        style={{
          width: '95%',
          marginBottom: '20px'
        }}
        // value={remark}
        // onChange={e => {
        //   setRemark(e.target.value)
        // }}
      />
      <Button variant='contained'>Submit</Button>
    </Card>
  )
}

export default AddFund
