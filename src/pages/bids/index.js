import { Card, CardHeader, Grid, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { getBetCategory } from 'src/helpers'
import GameTable from 'src/views/tables/GameTable'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const columns = [
  { id: 'no', label: '#', minWidth: 70 },
  { id: 'name', label: 'Game name', minWidth: 170 },
  {
    id: 'startTime',
    label: 'Today open',
    minWidth: 170
  },
  {
    id: 'endTime',
    label: 'Today close ',
    minWidth: 170
  },

  {
    id: 'isActive',
    label: 'Active ',
    minWidth: 170
  },
  {
    id: 'markerStatus',
    label: 'Market Status',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170
  }
]

export default function BidsPage() {
  let [rows, setRows] = useState([])
  const router = useRouter()
  useEffect(() => {
    getAllBids()
  }, [])

  const isRefresh = () => {
    getAllBids()
  }

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
        <Typography variant='h5'>Game Name List</Typography>
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
          add game
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <GameTable columns={columns} rows={rows} refreshPage={isRefresh} />
        </Card>
      </Grid>
    </Grid>
  )
}
