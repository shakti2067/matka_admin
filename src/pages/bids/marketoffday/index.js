import { Card, CardHeader, Grid, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { getBetCategory, getDaysByCategoryId, updateDays } from 'src/helpers'
import MarketOffDayTable from 'src/views/tables/MarketOffDayTable'

const columns = [
  { id: 'no', label: '#' },
  { id: 'day', label: 'Day', minWidth: 170 },
  {
    id: 'todayOpen',
    label: 'Today open',
    minWidth: 170
  },
  {
    id: 'todayClose',
    label: 'Today close ',
    minWidth: 170
  }
]

const row = [
  { id: '1', day: 'Monday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '2', day: 'Tuesday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '3', day: 'Wednesday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '4', day: 'Wednesday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '5', day: 'Friday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '7', day: 'Saturday', openTime: '11:20 PM', closeTime: '11:59 PM' },
  { id: '6', day: 'Sunday', openTime: '11:20 PM', closeTime: '11:59 PM' }
]
export default function MarketOffDay() {
  let [rows, setRows] = useState([])
  const router = useRouter()

  let getMarketTimes = () => {
    getDaysByCategoryId(router.query.id)
      .then(data => {
        console.log(data, 'this is data')
        setRows(data.data)
      })
      .catch(err => {
        console.log(err, 'this is err')
      })
  }
  useEffect(() => {
    getMarketTimes()
  }, [router.query])
  let submit = () => {
    updateDays(rows)
      .then(data => {
        console.log(data, 'this is data')
        router.back()
      })
      .catch(err => {
        console.log(err, 'this is error')
      })
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        <Typography variant='h5'>Market Day Settings</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <MarketOffDayTable
            columns={columns}
            rows={rows}
            onChange={(key, value, index) => {
              rows[index][key] = value
              setRows([...rows])
            }}
          />
        </Card>

        <Grid item xs={12} md={2}>
          <Button
            onClick={() => {
              submit()
            }}
            type='submit'
            variant='contained'
            size='large'
            style={{ marginTop: 13 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
