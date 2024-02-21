import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useDebugValue, useEffect, useState } from 'react'
import { createBids } from 'src/helpers'

let generateTimeSlots = () => {
  var x = 5 //minutes interval
  var times = [] // time array
  var tt = 0 // start time
  var ap = ['am', 'pm'] // AM-PM

  //loop to increment the time and push results in array
  for (var i = 0; tt < 24 * 60; i++) {
    var hh = Math.floor(tt / 60) // getting hours of day in 0-24 format
    var mm = tt % 60 // getting minutes of the hour in 0-55 format
    times[i] = ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) + ' ' + ap[Math.floor(hh / 12)] // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + x
  }

  return times
}
export default function CreateBidPage() {
  const router = useRouter()
  let [form, setForm] = useState({
    name: '',
    id: '',
    startTime: '',
    endTime: ''
  })
  let [error, setError] = useState({
    nameErr: '',
    idErr: '',
    startTimeErr: '',
    endTimeErr: ''
  })

  let [edit, setEdit] = useState(false)

  // let data = JSON.parse(router.query.gameData)
  // console.log('data', data)

  // useEffect(() => {
  //   if (data) {
  //     setEdit(true)
  //   }
  // }, [])

  let validation = () => {
    let { name, id, startTime, endTime } = form

    if (name.length === 0) {
      setError({ ...error, nameErr: 'Please enter game name' })
      return false
    }
    if (id.length === 0) {
      setError({ ...error, idErr: 'Please enter bid id' })
      return false
    }
    if (startTime.length === 0) {
      setError({ ...error, startTimeErr: 'Please select open time' })
      return false
    }
    if (endTime.length === 0) {
      setError({ ...error, endTimeErr: 'Please select close time' })
      return false
    }
    return true
  }

  let createBid = () => {
    let { name, id, startTime, endTime } = form
    console.log(validation(), 'this is validation')

    if (validation()) {
      let bidData = {
        name,
        uniqueNumber: id,
        startTime,
        endTime
      }
      createBids(bidData)
        .then(data => {
          router.back()
        })
        .catch(err => {
          console.log(err, 'this is error')
        })
    }
  }
  let resetBid = () => {
    console.log('reset call')
    setForm({
      name: '',
      id: '',
      startTime: '',
      endTime: ''
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        {!edit ? <Typography variant='h5'>Add Game</Typography> : <Typography variant='h5'>Edit Game</Typography>}
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Game Name'
                    placeholder='Please enter bid name'
                    onChange={e => {
                      let value = e.target.value
                      setForm({ ...form, name: value })
                      setError({ ...error, nameErr: '' })
                    }}
                    value={edit ? data.name : form.name}
                  />
                  {error.nameErr && <p style={{ color: 'red' }}>{error.nameErr}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='ID'
                    placeholder='Please enter bid ID'
                    onChange={e => {
                      let value = e.target.value
                      setForm({ ...form, id: value })
                      setError({ ...error, idErr: '' })
                    }}
                    value={form.id}
                  />
                  {error.idErr && <p style={{ color: 'red' }}>{error.idErr}</p>}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Open Time</InputLabel>
                    <Select
                      value={form.startTime}
                      onChange={e => {
                        let value = e.target.value
                        setForm({ ...form, startTime: value })
                        setError({ ...error, startTimeErr: '' })
                      }}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Start Time' id='select-multiple-language' />}
                    >
                      {generateTimeSlots().map((d, index) => {
                        return (
                          <MenuItem value={d} key={index}>
                            {d}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    {error.startTimeErr && <p style={{ color: 'red' }}>{error.startTimeErr}</p>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Close Time</InputLabel>
                    <Select
                      value={form.endTime}
                      onChange={e => {
                        let value = e.target.value
                        setForm({ ...form, endTime: value })
                        setError({ ...error, endTimeErr: '' })
                      }}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='End Time' id='select-multiple-language' />}
                    >
                      {generateTimeSlots()
                        .filter(time => time > form.startTime)
                        .map((d, index) => {
                          return (
                            <MenuItem value={d} key={index}>
                              {d}
                            </MenuItem>
                          )
                        })}
                    </Select>
                    {error.endTimeErr && <p style={{ color: 'red' }}>{error.endTimeErr}</p>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center'
                      // justifyContent: 'space-between'
                    }}
                  >
                    <Button type='submit' variant='contained' size='large' onClick={createBid}>
                      Create
                    </Button>
                    <Button type='submit' variant='contained' color='error' size='large' onClick={resetBid}>
                      Reset
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
