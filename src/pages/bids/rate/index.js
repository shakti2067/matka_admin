import { Button, TextField, Typography } from '@mui/material'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { getAllBets, updateAllBets } from 'src/helpers'

function GameRate() {
  const [value1, setValue1] = useState('')
  const [bets, setBets] = useState([])

  const handleSubmit = () => {
    console.log('edit call', bets)
    updateAllBets(bets)
  }

  let getAllBetsApi = () => {
    getAllBets()
      .then(data => {
        if (data.success) {
          setBets(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllBetsApi()
  }, [])

  return (
    <div>
      <div style={{ margin: '5px', borderRadius: '5px' }}>
        <Typography
          variant='h6'
          style={{
            //   padding: '15px',
            margin: '0px'
          }}
        >
          Add Games Rate
        </Typography>
        {bets &&
          bets.map((d, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '25px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>{d.name} value 1</Typography>
                  <TextField
                    type='number'
                    value={d.batAmount}
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      bets[i].batAmount = e.target.value
                      setBets([...bets])
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>{d.name} value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={d.winAmount}
                    placeholder='Enter EMAIL'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      bets[i].winAmount = e.target.value
                      setBets([...bets])
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        <Button onClick={() => handleSubmit()} type='submit' variant='contained' size='large' style={{ marginTop: 25 }}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default GameRate
