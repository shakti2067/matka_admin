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

const columnBid = [
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 120
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 160,
    align: 'right'
  },
  {
    id: 'gameType',
    label: 'Game Type',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'openPaana',
    label: 'Open Paana',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'openDigit',
    label: 'Open Digit',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'closePaana',
    label: 'Close Paana',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'closeDigit',
    label: 'Close Digit',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'points',
    label: 'Points',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'txId',
    label: 'Tx Id',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'txDate',
    label: 'Tx Date',
    minWidth: 170,
    align: 'right'
  }
]
function createBid(
  userName,
  gameName,
  gameType,
  openPaana,
  openDigit,
  closePaana,
  closeDigit,
  points,
  amount,
  txId,
  txDate
) {
  return {
    userName,
    gameName,
    gameType,
    openPaana,
    openDigit,
    closePaana,
    closeDigit,
    points,
    amount,
    txId,
    txDate
  }
}
const rowBid = [
  createBid('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 'data', 'data2', 'data3', 'data4', 'data5')
]

function index() {
  const [bidPage, setBidPage] = useState(0)
  const [rowsBidPage, setRowsBidPage] = useState(10)
  const handleChangeBidPerPage = (event, newPage) => {
    setBidPage(newPage)
  }
  const handleChangeRowsBidPerPage = event => {
    setRowsBidPage(+event.target.value)
    setBidPage(0)
  }
  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Winning History Report</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
          <FormControl style={{ width: '14rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '23rem' }} defaultValue='USA'>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Market Time</Typography>
            <Select style={{ width: '23rem' }} defaultValue='USA'>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}>
              Submit
            </Button>
          </div>
        </div>
      </Card>
      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <Typography variant='h6' style={{ padding: '20px' }}>
          Winning History List
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columnBid.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowBid.slice(bidPage * rowsBidPage, bidPage * rowsBidPage + rowsBidPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columnBid.map(column => {
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
