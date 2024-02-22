import { Button, Input, TextField } from '@mui/material'
import React, { useState } from 'react'

function contactSettings() {
  const [form, setForm] = useState({
    mobileNumber: '+918690786739',
    telegramNumber: 'kalyankhatrionlinematka',
    whatsappNumber: '+918690786739',
    website: 'https://Timebazzar.com'
  })

  const handleSubmit = () => {
    let { mobileNumber, telegramNumber, whatsappNumber, website } = form
    console.log('submit')
  }

  return (
    <div>
      <div style={{ margin: '5px', borderRadius: '5px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px' }}>
          <h3 style={{ padding: '15px', margin: '0px' }}>Contact Settings</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '33%' }}>
              <h5 style={{ marginBottom: '5px' }}>Mobile Number eg.9876543210</h5>
              <TextField
                type='text'
                defaultValue='+918690786739'
                value={form.mobileNumber}
                onChange={e => {
                  setForm({
                    ...form,
                    mobileNumber: e.target.value
                  })
                }}
                style={{
                  width: '95%'
                }}
              />
            </div>
            <div style={{ width: '33%' }}>
              <h5 style={{ marginBottom: '5px' }}>Telegram Mobile (Optional)</h5>
              <TextField
                type='text'
                defaultValue='kalyankhatrionlinematka'
                style={{
                  width: '95%'
                }}
                value={form.telegramNumber}
                onChange={e => {
                  setForm({
                    ...form,
                    telegramNumber: e.target.value
                  })
                }}
              />
            </div>
            <div style={{ width: '33%' }}>
              <h5 style={{ marginBottom: '5px' }}>WhatsApp Number</h5>
              <TextField
                type='text'
                defaultValue='+918690786739'
                style={{
                  width: '95%'
                }}
                value={form.whatsappNumber}
                onChange={e => {
                  setForm({
                    ...form,
                    whatsappNumber: e.target.value
                  })
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '33%' }}>
              <h5 style={{ marginBottom: '5px' }}>Website</h5>
              <TextField
                type='text'
                defaultValue='https://Timebazzar.com'
                style={{
                  width: '95%'
                }}
                value={form.website}
                onChange={e => {
                  setForm({
                    ...form,
                    website: e.target.value
                  })
                }}
              />
            </div>
          </div>

          <Button style={{ marginTop: 15 }} type='submit' variant='contained' size='large' onClick={handleSubmit}>
            submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default contactSettings
