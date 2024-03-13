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
    id: 'name',
    label: '#',
    minWidth: 100
  },
  {
    id: 'senderName',
    label: 'Sender Name',
    minWidth: 160
  },
  {
    id: 'receiverName',
    label: 'Receiver Name',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170
  }
]
function createBid(name, senderName, receiverName, amount, date) {
  return {
    name,
    senderName,
    receiverName,
    amount,
    date
  }
}
const rowBid = [createBid('India', 'IN', 1324171354, 3287263, 3287263)]

function index() {
  const [bidPage, setBidPage] = useState(0)
  const [rowsBidPage, setRowsBidPage] = useState(10)

  const handleChangeBidPerPage = newPage => {
    setBidPage(newPage)
  }
  const handleChangeRowsBidPerPage = event => {
    setRowsBidPage(+event.target.value)
    // setBidPage(0)
  }
  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Transfer Point Report</Typography>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' style={{ padding: '20px' }}>
            Transfer List
          </Typography>
          <Button style={{ backgroundColor: '#9155FD', color: 'white', height: '2.5rem', marginRight: '20px' }}>
            Total Transfer Amount: ₹ 0{' '}
          </Button>
        </div>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rowsBidPage.length}
          rowsPerPage={rowsBidPage}
          page={bidPage}
          onPageChange={handleChangeBidPerPage}
          onRowsPerPageChange={handleChangeRowsBidPerPage}
        />
      </Card>
    </>
  )
}

export default index
