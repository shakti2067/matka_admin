import { Card, CardHeader, Grid, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { getAllWinner, getBetCategory } from 'src/helpers'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'bids', label: 'BIDS', minWidth: 100 },
  {
    id: 'wins',
    label: 'WINS',
    minWidth: 170
  }
]

export default function WinnersPage() {
  let [rows, setRows] = useState([])
  console.log('rows', rows)
  const router = useRouter()
  useEffect(() => {
    getAllWinnerApi()
  }, [])

  let getAllWinnerApi = () => {
    getAllWinner()
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
        <Typography variant='h5'>Winners</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        {/* <Button
          onClick={() => {
            router.push('/bids/create')
          }}
          type='submit'
          variant='contained'
          size='large'
        >
          Create Bid
        </Button> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableStickyHeader columns={columns} rows={rows} />
        </Card>
      </Grid>
    </Grid>
  )
}
