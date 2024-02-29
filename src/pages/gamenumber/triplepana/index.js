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

// let number = Array.from(Array(10).keys())
function TriplePana() {
  let [triplePana, setTriplePana] = useState([])

  const globalSettingApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setTriplePana(data.data.gameNumber.triplePana)
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
      <Card sx={{ overflow: 'hidden', marginLeft: '20px', padding: '20px' }}>
        <Typography variant='h6'>Tripple Pana Numbers</Typography>
        <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
          {triplePana.map((d, i) => {
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

export default TriplePana
