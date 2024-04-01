import { Button, Card, CardHeader, Grid, Input, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { getUser } from 'src/helpers'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import moment from 'moment'
import UserTable from 'src/views/tables/UserTable'
import { useRouter } from 'next/router'

const columns = [
  { id: 'no', label: '#', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'mobile', label: 'Mobile', minWidth: 170 },
  { id: 'createdAt', label: 'Date', minWidth: 170 },
  { id: 'balance', label: 'Balance', minWidth: 170 },
  {
    id: 'isBetting',
    label: 'Betting',
    minWidth: 170
  },
  {
    id: 'isTransfer',
    label: 'Transfer',
    minWidth: 170
  },
  {
    id: 'isActive',
    label: 'Active',
    minWidth: 170
  },
  {
    id: 'isDeleted',
    label: 'Delete',
    minWidth: 170
  }
]

export default function UsersPage() {
  let router = useRouter()

  let [rows, setRows] = useState([])

  const isRefresh = () => {
    getAllUsers()
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  let getAllUsers = () => {
    let isBetting = true

    getUser(isBetting)
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
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography variant='h5'>Users</Typography>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => {
                router.replace('/users/unapproveuser')
              }}
            >
              unapprove users
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <UserTable columns={columns} rows={rows} refreshPage={isRefresh} />
        </Card>
      </Grid>
    </Grid>
  )
}
