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
    label: '#'
  },
  {
    id: 'requestAmount',
    label: 'Request Amount'
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    align: 'right'
  },
  {
    id: 'receiptImage',
    label: 'Receipt Image',
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    align: 'right'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    align: 'right'
  }
]
function createBid(name, requestAmount, requestNo, receiptImage, date, status, action) {
  return {
    name,
    requestAmount,
    requestNo,
    receiptImage,
    date,
    status,
    action
  }
}
const rowBid = [createBid('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 3287263)]

const columnWinAmount = [
  {
    id: 'name',
    label: '#'
  },
  {
    id: 'requestAmount',
    label: 'Request'
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    align: 'right'
  },
  {
    id: 'receiptImage',
    label: 'Receipt Image',
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    align: 'right'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    align: 'right'
  }
]
function createWinAmount(name, requestAmount, requestNo, receiptImage, date, status, action) {
  return {
    name,
    requestAmount,
    requestNo,
    receiptImage,
    date,
    status,
    action
  }
}
const rowWinAmount = [createWinAmount('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 3287263)]

function index() {
  const [Bid, setBidPage] = useState()
  const [rowsBidPage, setrowsBidPage] = useState(10)
  const [isBidAmount, setBidAmount] = useState(true)
  const toggleBidAmount = () => {
    setBidAmount(!isBidAmount)
  }
  const handleChangeBidPage = (event, newPage) => {
    setBidPage(newPage)
  }
  const handleChangeBidPerPage = event => {
    setrowsBidPage(+event.target.value)
    setBidPage(0)
  }

  const [WinAmount, setWinAmount] = useState()
  const [rowsWinAmount, setrowsWinAmount] = useState(10)

  const handleChangeWinAmount = (event, newPage) => {
    setWinAmount(newPage)
  }
  const handleChangeWinAmountPerPage = event => {
    setrowsWinAmount(+event.target.value)
    setWinAmount(0)
  }

  const [isCardVisible, setCardVisibility] = useState(false)
  const toggleCard = () => {
    setCardVisibility(!isCardVisible)
  }

  const [isCardVisible2, setCardVisibility2] = useState(false)
  const toggleCard2 = () => {
    setCardVisibility2(!isCardVisible2)
  }
  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Winning History Report</Typography>
        <div style={{ display: 'flex', gap: '2rem', margin: '10px 0' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}>
              Submit
            </Button>
          </div>
        </div>
      </Card>

      <Card style={{ padding: '20px', marginTop: '20px' }}>
        <div style={{ width: '50%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px dashed  #d0b6fe',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            <Typography variant='body1' style={{ color: '#9155FD' }}>
              Total Bid Amount
            </Typography>
            <Typography variant='body1'>₹ 200</Typography>
            <Button onClick={toggleCard} style={{ backgroundColor: '#9155FD', color: 'white', height: '1.5rem' }}>
              {isCardVisible}View
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px dashed  #d0b6fe',
              padding: '10px',
              borderRadius: '5px',
              margin: '10px 0'
            }}
          >
            <Typography variant='body1' style={{ color: '#673AB7' }}>
              Total Win Amount
            </Typography>
            <Typography variant='body1'>₹ 200</Typography>
            <Button onClick={toggleCard2} style={{ backgroundColor: '#9155FD', color: 'white', height: '1.5rem' }}>
              {isCardVisible2}View
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '26%',
              backgroundColor: '#34c38f',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            <Typography variant='body1' style={{ color: 'white', fontWeight: '500' }}>
              Total Profit Amount
            </Typography>
            <Typography variant='body1' style={{ color: 'white', fontWeight: '500' }}>
              ₹ 200
            </Typography>
          </div>
        </div>
      </Card>

      {isCardVisible && (
        <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
          <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>Bid History</Typography>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>Search :</label>
              <InputBox />
            </div>
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
                {rowBid.slice(Bid * rowsBidPage, Bid * rowsBidPage + rowsBidPage).map(row => {
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
            count={rowBid.length}
            rowsPerPage={rowsBidPage}
            page={Bid}
            onPageChange={handleChangeBidPage}
            onRowsPerPageChange={handleChangeBidPerPage}
          />
        </Card>
      )}

      {isCardVisible2 && (
        <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
          <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>Winning History</Typography>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>Search :</label>
              <InputBox />
            </div>
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnWinAmount.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowWinAmount.slice(WinAmount * rowsWinAmount, WinAmount * rowsWinAmount + rowsWinAmount).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnWinAmount.map(column => {
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
            count={rowWinAmount.length}
            rowsPerPage={rowsWinAmount}
            page={WinAmount}
            onPageChange={handleChangeWinAmount}
            onRowsPerPageChange={handleChangeWinAmountPerPage}
          />
        </Card>
      )}
    </>
  )
}

export default index
