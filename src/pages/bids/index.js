import { Card, CardHeader, Grid, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { getBetCategory } from 'src/helpers'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'uniqueNumber', label: 'ID', minWidth: 100 },
  {
    id: 'startTime',
    label: 'Start Time',
    minWidth: 170
  },
  {
    id: 'endTime',
    label: 'End Time',
    minWidth: 170
  }
]

export default function BidsPage() {
  let [rows, setRows] = useState([])
  const router = useRouter()
  useEffect(() => {
    getAllBids()
  }, [])

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        setRows(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={10}>
        <Typography variant='h5'>Bids</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          onClick={() => {
            router.push('/bids/create')
          }}
          type='submit'
          variant='contained'
          size='large'
        >
          Create Bid
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableStickyHeader columns={columns} rows={rows} />
        </Card>
      </Grid>
    </Grid>
  )
}
