import { Card, CardHeader, Grid, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { getUser } from 'src/helpers'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import moment from 'moment'

const columns = [
  // { id: 'no', label: '#', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'mobile', label: 'Mobile', minWidth: 170 },
  { id: 'createdAt', label: 'Date', minWidth: 170 },
  { id: 'balance', label: 'Balance', minWidth: 170 },

  { id: 'totalBets', label: 'Bids', minWidth: 100 },
  {
    id: 'totalWins',
    label: 'Wins',
    minWidth: 170
  },
  {
    id: 'isActive',
    label: 'Active',
    minWidth: 170
  }
]

export default function UsersPage() {
  let [rows, setRows] = useState([])
  console.log('rows')
  useEffect(() => {
    getAllUsers()
  }, [])

  let getAllUsers = () => {
    getUser()
      .then(data => {
        setRows(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>Users</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableStickyHeader columns={columns} rows={rows} />
        </Card>
      </Grid>
    </Grid>
  )
}
