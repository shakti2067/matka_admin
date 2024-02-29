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
// let numbers = Array.from(Array(100).keys())
function HalfSangam() {
  let [openAnk, setOpenAnk] = useState([])
  let [closeAnk, setCloseAnk] = useState([])

  const globalSettingApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setOpenAnk(data.data.gameNumber.halfSangam.openAnk)
          setCloseAnk(data.data.gameNumber.halfSangam.closeAnk)
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
        <Typography variant='h6'>Half Sangam Numbers</Typography>
        <Typography variant='body1' style={{ marginTop: '5px' }}>
          Open Ank
        </Typography>
        <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
          {openAnk.map((d, i) => {
            return (
              <Typography key={i} variant='button' style={boxStyle}>
                {d}
              </Typography>
            )
          })}
        </div>
        <Typography variant='body1' style={{ marginTop: '5px' }}>
          Close Ank
        </Typography>
        <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
          {closeAnk.map((d, i) => {
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

export default HalfSangam
