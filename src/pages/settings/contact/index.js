import { Button, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addContact, getContact } from 'src/helpers'

function contactSettings() {
  const [form, setForm] = useState({
    mobileNumber: '',
    telegramNumber: '',
    whatsAppNumber: '',
    webSite: ''
  })

  const handleSubmit = () => {
    let { mobileNumber, telegramNumber, whatsAppNumber, webSite } = form

    let params = {
      mobileNumber,
      telegramNumber: telegram,
      whatsAppNumber,
      webSite
    }
    addContact(params)
      .then(data => {
        if (data.success) {
          getContactApi()
          console.log('data', data)
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const getContactApi = () => {
    getContact()
      .then(data => {
        if (data.success) {
          setForm({
            mobileNumber: data.data.mobileNumber,
            telegramNumber: data.data.telegram,
            whatsAppNumber: data.data.whatsAppNumber,
            webSite: data.data.webSite
          })
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getContactApi()
  }, [])

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
                value={form.whatsAppNumber}
                onChange={e => {
                  setForm({
                    ...form,
                    whatsAppNumber: e.target.value
                  })
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '33%' }}>
              <h5 style={{ marginBottom: '5px' }}>Web Site</h5>
              <TextField
                type='text'
                defaultValue='https://Timebazzar.com'
                style={{
                  width: '95%'
                }}
                value={form.webSite}
                onChange={e => {
                  setForm({
                    ...form,
                    webSite: e.target.value
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
