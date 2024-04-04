import { Button, Card, CardHeader, Grid, Input, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { getUser } from 'src/helpers'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import moment from 'moment'
import UserTable from 'src/views/tables/UserTable'
import { useRouter } from 'next/router'
import InputBox from 'src/components/InputBox'

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
  let [search, setSearch] = useState('')

  console.log('search', search)

  const isRefresh = () => {
    getAllUsers()
  }
  useEffect(() => {
    getAllUsers()
  }, [search])

  const searchValue = d => {
    setSearch(d)
  }

  let getAllUsers = () => {
    let isBetting = true

    getUser(isBetting, search)
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
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '1430px', marginTop: '10px' }}>
        <InputBox searchValue={searchValue} />
      </div>
      <Grid item xs={12}>
        <Card>
          <UserTable columns={columns} rows={rows} refreshPage={isRefresh} />
        </Card>
      </Grid>
    </Grid>
  )
}
