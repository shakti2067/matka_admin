import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function GameRate() {
  const [form, setForm] = useState({
    singleDigitValue1: '10',
    singleDigitValue2: '100',
    jodiDigitValue1: '10',
    jodiDigitValue2: '1000',
    singlePanaValue1: '10',
    singlePanaValue2: '1400',
    doublePanaValue1: '10',
    doublePanaValue2: '2800',
    triplePanaValue1: '10',
    triplePanaValue2: '7000',
    halfSangamValue1: '10',
    halfSangamValue2: '12000',
    fullSangamValue1: '10',
    fullSangamValue2: '110000'
  })

  const handleSubmit = () => {
    const {
      singleDigitValue1,
      singleDigitValue2,
      jodiDigitValue1,
      jodiDigitValue2,
      singlePanaValue1,
      singlePanaValue2,
      doublePanaValue1,
      doublePanaValue2,
      triplePanaValue1,
      triplePanaValue2,
      halfSangamValue1,
      halfSangamValue2,
      fullSangamValue1,
      fullSangamValue2
    } = form

    console.log('form submit', singleDigitValue1)
  }

  return (
    <div>
      <div style={{ margin: '5px', borderRadius: '5px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px' }}>
          <Typography
            variant='h6'
            style={{
              //   padding: '15px',
              margin: '0px'
            }}
          >
            Add Games Rate
          </Typography>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Typography style={{ marginTop: '15px' }}>Single Digit Value 1</Typography>
              <TextField
                type='number'
                value={form.singleDigitValue1}
                defaultValue='10'
                style={{
                  width: '95%'
                }}
                onChange={e => {
                  setForm({ ...form, singleDigitValue1: e.target.value })
                }}
              />
            </div>
            <div style={{ width: '50%' }}>
              <Typography style={{ marginTop: '15px' }}>Single Digit Value 2</Typography>
              <TextField
                type='number'
                defaultValue='0'
                value={form.singleDigitValue2}
                placeholder='Enter EMAIL'
                style={{
                  width: '95%'
                }}
                onChange={e => {
                  setForm({ ...form, singleDigitValue2: e.target.value })
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
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
          </div>

          <Button onClick={() => handleSubmit} type='submit' variant='contained' size='large' style={{ marginTop: 25 }}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GameRate
