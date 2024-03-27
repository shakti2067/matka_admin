import { Card, Typography } from '@mui/material'
import React, { useState } from 'react'

const boxStyle = {
  border: '2px solid #b690fe',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#f6f1ff',
  borderRadius: '5px',
  cursor: 'pointer'
}

const redBoxStyle = {
  border: '2px solid #f78f8f',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#fdeaea',
  borderRadius: '5px',
  cursor: 'pointer'
}

const numbers = Array.from(Array(13).keys())

function SinglePana() {
  const [singlePana, setSinglePana] = useState([
    ['127', '136', '145', '190', '235', '280', '370', '479', '460', '569', '389', '578'],
    ['128', '137', '146', '236', '245', '290', '380', '470', '489', '560', '678', '579'],
    ['129', '138', '147', '156', '237', '246', '345', '390', '480', '570', '679', '589'],
    ['120', '139', '148', '157', '238', '247', '256', '346', '490', '580', '670', '689'],
    ['130', '149', '158', '167', '239', '248', '257', '347', '356', '590', '680', '789'],
    ['140', '159', '168', '230', '249', '258', '267', '348', '357', '456', '690', '780'],
    ['123', '150', '169', '178', '240', '259', '268', '349', '358', '457', '367', '790'],
    ['124', '160', '179', '250', '269', '278', '340', '359', '368', '458', '467', '890'],
    ['125', '134', '170', '189', '260', '279', '350', '369', '378', '459', '567', '468'],
    ['126', '135', '180', '234', '270', '289', '360', '379', '450', '469', '478', '568']
  ])

  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Single Pana Numbers</Typography>
        {singlePana.map((ankNumbers, index) => (
          <div key={index}>
            <Typography variant='body1' style={{ marginTop: '5px' }}>
              Single Ank {index}
            </Typography>
            <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
              <Typography variant='button' style={redBoxStyle}>
                {index}
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
              {ankNumbers.map((number, i) => (
                <Typography key={i} variant='button' style={boxStyle}>
                  {number}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default SinglePana
