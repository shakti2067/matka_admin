import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function HowToPlay() {
  const [form, setForm] = useState({
    content: '',
    videLink: ''
  })
  const [error, setError] = useState({
    contentErr: '',
    videLinkErr: ''
  })

  let validation = () => {
    let { content, videLink } = form

    if (content.length === 0) {
      setError({ ...error, contentErr: 'Please enter content' })
      return false
    }
    if (videLink.length === 0) {
      setError({ ...error, videLinkErr: 'Please enter video link' })
      return false
    }
    return true
  }

  const handleSubmit = () => {}

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{ width: '100%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}
      >
        <div>
          <Typography style={{ margin: '5px' }} variant='h6'>
            How To Play
          </Typography>
          <Typography style={{ margin: '5px' }}>How To Play Content</Typography>
        </div>
        <textarea
          name='postContent'
          value={form.content}
          onChange={e => {
            setForm({ ...form, content: e.target.value })
          }}
          defaultValue='Simply download our application from Google Play Store or from our official website. 
                    Register with your Mobile Number, Email ID, User Name with our platform.                
                    Login with the application using Mobile Number and Password with your secure PIN code. 
                    Select the Game type, select your favourite number and start to Play Game.  
                    Get a chance to win upto 10 Lac Points.'
          rows={10}
          style={{
            width: '100%',
            marginBottom: '10px',
            outline: 'none',
            resize: 'none',
            fontSize: '16px',
            padding: '15px',
            opacity: '0.5'
          }}
        />
        {error.contentErr && <p style={{ color: 'red' }}>{error.contentErr}</p>}

        <div style={{ marginBottom: '10px' }}>
          <Typography style={{ margin: '5px' }}>Video Link</Typography>
          <TextField
            type='text'
            id='videoLink'
            value={form.videLink}
            onChange={e => {
              setForm({ ...form, videLink: e.target.value })
            }}
            style={{
              width: '100%'
            }}
            defaultValue={'https://www.youtube.com/watch?v=tvNc3jA-6_U'}
          />
        </div>
        {error.videLinkErr && <p style={{ color: 'red' }}>{error.videLinkErr}</p>}
        <div>
          <Button style={{ marginTop: 15 }} type='submit' variant='contained' size='large' onClick={handleSubmit}>
            submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HowToPlay
