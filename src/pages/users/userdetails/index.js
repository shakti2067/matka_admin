import {
  CardContent,
  Grid,
  Typography,
  Card,
  Switch,
  IconButton,
  CardMedia,
  Avatar,
  Box,
  Button,
  AvatarGroup
} from '@mui/material'

import React from 'react'
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Trophy from 'src/views/dashboard/Trophy'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { DotsVertical } from 'mdi-material-ui'

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
  }
]

export default function userdetails() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>User Details</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <Trophy /> */}

        <Card>
          {/* <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Hello:Sk</Typography>
              <Typography>
                Active: <Switch checked={true} />
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Mobile:123456789</Typography>
              <Typography>
                Betting: <Switch checked={true} />
              </Typography>
            </div>
            <IconButton
              size='small'
              aria-label='settings'
              className='card-more-options'
              sx={{ color: 'text.secondary' }}
            ></IconButton>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography>
                Transfer: <Switch checked={true} />
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography>
                Logout status: <Switch checked={true} />
              </Typography>
            </div>
          </CardContent> */}
          <Card sx={{ position: 'relative' }}>
            <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />

            <Avatar
              alt='Robert Meyer'
              src='/images/avatars/1.png'
              sx={{
                width: 75,
                height: 75,
                left: '1.313rem',
                top: '10.28125rem',
                position: 'absolute',
                border: theme => `0.25rem solid ${theme.palette.common.white}`
              }}
            />
            <CardContent>
              <Box
                sx={{
                  mt: 5.75,
                  mb: 8.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>Robert Meyer</Typography>
                    <Typography>
                      Active: <Switch checked={true} />
                    </Typography>
                  </div>
                  <Typography variant='h6'>Mobile:123456789</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              ></Box>
            </CardContent>
          </Card>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>Add fund request</Typography>
        <TableStickyHeader columns={columns} />
      </Grid>
    </Grid>
  )
}
