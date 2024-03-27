import { Card, Typography } from '@mui/material'
import React from 'react'

let boxStyle = {
  border: '2px solid #b690fe',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#f6f1ff',
  borderRadius: '5px',
  cursor: 'pointer'
}

let redBoxStyle = {
  border: '2px solid #f78f8f',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#fdeaea',
  borderRadius: '5px',
  cursor: 'pointer'
}

let numbers = Array.from(Array(10).keys())

const doublePanaData = [
  { ank: '0', panna: ['550', '668', '244', '299', '226', '488', '677', '118', '334'] },
  { ank: '1', panna: ['100', '119', '155', '227', '335', '344', '399', '588', '669'] },
  { ank: '2', panna: ['200', '110', '228', '255', '336', '499', '660', '688', '778'] },
  { ank: '3', panna: ['300', '166', '229', '337', '355', '445', '599', '779', '788'] },
  { ank: '4', panna: ['400', '112', '220', '266', '338', '446', '455', '699', '770'] },
  { ank: '5', panna: ['500', '113', '122', '177', '339', '366', '447', '799', '889'] },
  { ank: '6', panna: ['600', '114', '277', '330', '448', '466', '556', '880', '899'] },
  { ank: '7', panna: ['700', '115', '133', '188', '223', '377', '449', '557', '566'] },
  { ank: '8', panna: ['800', '116', '224', '233', '288', '440', '477', '558', '990'] },
  { ank: '9', panna: ['900', '117', '144', '199', '225', '388', '559', '577', '667'] }
]

function DoublePana() {
  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Double Pana Numbers</Typography>
        {doublePanaData.map((item, index) => (
          <div key={index}>
            <Typography variant='body1' style={{ marginTop: '5px' }}>
              Single Ank {item.ank}
            </Typography>
            <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
              <Typography variant='button' style={redBoxStyle}>
                {item.ank}
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
              {item.panna.map((pannaItem, pIndex) => (
                <Typography key={pIndex} variant='button' style={boxStyle}>
                  {pannaItem}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
export default DoublePana
