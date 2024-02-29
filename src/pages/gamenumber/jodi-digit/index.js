import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getGlobalSettings } from 'src/helpers'

let boxStyle = {
  border: '2px solid #b690fe',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#f6f1ff',
  borderRadius: '5px',
  cursor: 'pointer'
}

function JodiDigit() {
  let [jodiDigitNumber, setJodiDigitNumber] = useState([])

  const globalSettingApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setJodiDigitNumber(data.data.gameNumber.jodiDigit)
        } else {
          console.log('error', data.message)
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    globalSettingApi()
  }, [])

  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Jodi Digit Numbers </Typography>
        <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
          {jodiDigitNumber.map((d, i) => {
            return (
              <Typography key={i} variant='button' style={boxStyle}>
                {d}
              </Typography>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
export default JodiDigit
