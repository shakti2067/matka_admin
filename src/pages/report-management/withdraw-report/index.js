import React, { useState } from 'react'
import {
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputBox from 'src/components/InputBox'

const columnWithdraw = [
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 100
  },
  {
    id: 'mobile',
    label: 'Mobile',
    minWidth: 160
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170
  },
  {
    id: 'paymentMethod',
    label: 'Payment Method',
    minWidth: 170
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    minWidth: 170
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170
  },
  {
    id: 'view',
    label: 'View',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170
  }
]
function createWithdraw(userName, mobile, amount, paymentMethod, requestNo, date, status, view, action) {
  return {
    userName,
    mobile,
    amount,
    paymentMethod,
    requestNo,
    date,
    status,
    view,
    action
  }
}
const rowWithdraw = [createWithdraw('India', 'IN', 1324171354, 3287263, 3287263, 'data1', 'data2', 'data3', 'data4')]

function index() {
  const [WithdrawPage, setWithdrawPage] = useState(0)
  const [rowsWithdrawPage, setrowsWithdrawPage] = useState(10)

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Withdraw History Report</Typography>
        <div style={{ display: 'flex', gap: '30px', margin: '10px 0' }}>
          <FormControl style={{ width: '25rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}>
              Submit
            </Button>
          </div>
        </div>
      </Card>
      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <div>
          <Typography variant='h6' style={{ padding: '20px' }}>
            Withdraw List
          </Typography>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columnWithdraw.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowWithdraw
                .slice(WithdrawPage * rowsWithdrawPage, WithdrawPage * rowsWithdrawPage + rowsWithdrawPage)
                .map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnWithdraw.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default index
