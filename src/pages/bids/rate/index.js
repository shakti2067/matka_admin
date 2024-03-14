import { Button, TextField, Typography } from '@mui/material'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { getAllBets } from 'src/helpers'

function GameRate() {
  const [value1, setValue1] = useState('')
  const [bets, setBets] = useState([])

  console.log('value1', value1)
  console.log('bets', bets)

  const handleSubmit = () => {
    console.log('edit call')
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
          bets.map(d => (
            <div style={{ backgroundColor: 'white', padding: '25px' }}>
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
                      setValue1(e.target.value)
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
                    // onChange={e => {
                    //   setForm({ ...form, singleDigitValue2: e.target.value })
                    // }}
                  />
                </div>
                {/* <Button
                  onClick={() => handleSubmit}
                  type='submit'
                  variant='contained'
                  // size='large'
                  style={{ width: 10, height: 50, marginTop: 41 }}
                >
                  Edit
                </Button> */}
              </div>
              {/* <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Jodi Digit Value 1</Typography>
                  <TextField
                    type='number'
                    placeholder='Enter Facebook Link'
                    defaultValue='0'
                    value={form.jodiDigitValue1}
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, jodiDigitValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Jodi Digit Value 2</Typography>
                  <TextField
                    type='number'
                    placeholder='Enter Twitter Link'
                    defaultValue='0'
                    value={form.jodiDigitValue2}
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, jodiDigitValue2: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Single Pana Value 1</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.singlePanaValue1}
                    placeholder='Enter Youtube Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, singlePanaValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Single Pana Value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.singlePanaValue2}
                    placeholder='Enter Google Plus Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, singlePanaValue2: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Double Pana Value 1</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.doublePanaValue1}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, doublePanaValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Double Pana Value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.doublePanaValue2}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, doublePanaValue2: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Tripple Pana Value 1</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.triplePanaValue1}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, triplePanaValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Tripple Pana Value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.triplePanaValue2}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, triplePanaValue2: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Half Sangam Value 1</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.halfSangamValue1}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, halfSangamValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Half Sangam Value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.halfSangamValue2}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, halfSangamValue2: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Full Sangam Value 1</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.fullSangamValue1}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, fullSangamValue1: e.target.value })
                    }}
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginTop: '15px' }}>Full Sangam Value 2</Typography>
                  <TextField
                    type='number'
                    defaultValue='0'
                    value={form.fullSangamValue2}
                    placeholder='Enter Instagram Link'
                    style={{
                      width: '95%'
                    }}
                    onChange={e => {
                      setForm({ ...form, fullSangamValue2: e.target.value })
                    }}
                  />
                </div>
              </div> */}
            </div>
          ))}
        <Button onClick={() => handleSubmit} type='submit' variant='contained' size='large' style={{ marginTop: 25 }}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default GameRate
