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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

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
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now())
  })
  let [error, setError] = useState({
    nameErr: '',
    startTimeErr: '',
    endTimeErr: ''
  })
  // const [todayOpenTime, setTodayOpenTime] = useState(dayjs(Date.now()))
  const data = router.query.gameData ? JSON.parse(router.query.gameData) : null

  const setDefaultValue = () => {
    setForm({
      ...form,
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime
    })
  }

  useEffect(() => {
    if (data != null) {
      setDefaultValue()
    }
  }, [])

  let validation = () => {
    let { name, startTime, endTime } = form

    if (name.length === 0) {
      setError({ ...error, nameErr: 'Please enter game name' })
      return false
    }
    // if (id.length === 0) {
    //   setError({ ...error, idErr: 'Please enter bid id' })
    //   return false
    // }
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
    let { name, startTime, endTime } = form

    if (validation()) {
      let bidData = {
        name,
        // uniqueNumber: id,
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
      // id: '',
      startTime: '',
      endTime: ''
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        <Typography variant='h5'>{data != null ? 'Edit game' : 'Add Game'}</Typography>
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
                    value={form.name}
                  />
                  {error.nameErr && <p style={{ color: 'red' }}>{error.nameErr}</p>}
                </Grid>
                {/* <Grid item xs={12}>
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
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  {/* <FormControl fullWidth>
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
                  </FormControl> */}

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        label={'Open time'}
                        value={form.startTime}
                        onChange={e => {
                          let value = e.target.value
                          setForm({ ...form, startTime: value })
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControl fullWidth>
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
                  </FormControl> */}

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        label={'Close time'}
                        value={form.endTime}
                        onChange={e => {
                          let value = e.target.value
                          setForm({ ...form, endTime: value })
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                      {data != null ? 'Edit' : 'Create'}
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
