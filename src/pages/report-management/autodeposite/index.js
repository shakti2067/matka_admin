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
  { id: 'name', label: '#', minWidth: 100 },
  { id: 'userName', label: 'User Name', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'method', label: 'Method', minWidth: 100 },
  { id: 'upi', label: 'UPI', minWidth: 100 },
  { id: 'txnRequestNo', label: 'Txn Request No. ', minWidth: 100 },
  { id: 'txnId', label: 'Txn ID', minWidth: 100 },
  { id: 'txnDate', label: 'Txn Date', minWidth: 100 }
]
function createWithdraw(name, userName, amount, method, upi, txnRequestNo, txnId, txnDate) {
  return {
    name,
    userName,
    amount,
    method,
    upi,
    txnRequestNo,
    txnId,
    txnDate
  }
}
const rowWithdraw = [createWithdraw('India', 'IN', 1324171354, 3287263, 3287263, 'data1', 'data2', 'data3')]

function index() {
  const [WithdrawPage, setWithdrawPage] = useState(0)
  const [rowsWithdrawPage, setrowsWithdrawPage] = useState(10)

  const handleChangeWinAmount = (event, newPage) => {
    setWithdrawPage(newPage)
  }
  const handleChangeWinAmountPerPage = event => {
    setrowsWithdrawPage(+event.target.value)
    setWithdrawPage(0)
  }

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Auto Deposit</Typography>
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
        <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>Auto Deposit History</Typography>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>Search :</label>
            <InputBox />
          </div>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rowsWithdrawPage.length}
          rowsPerPage={rowsWithdrawPage}
          page={WithdrawPage}
          onPageChange={handleChangeWinAmount}
          onRowsPerPageChange={handleChangeWinAmountPerPage}
        />
      </Card>
    </>
  )
}

export default index
