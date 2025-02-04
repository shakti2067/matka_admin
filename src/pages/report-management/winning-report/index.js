import React, { useEffect, useState } from 'react'
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
import dayjs from 'dayjs'
import { getAllBets, getBetCategory, winningReport } from 'src/helpers'

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

function WinningReport() {
  const today = new Date()

  const [bidPage, setBidPage] = useState(0)
  const [rowsBidPage, setRowsBidPage] = useState(10)
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedGameType, setSelectedGameType] = useState(0)
  const [gameTypeData, setGameTypeData] = useState([])
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  const [date, setDate] = useState(dayjs())
  const [rows, setRows] = useState([])

  const handleChangeBidPerPage = (event, newPage) => {
    setBidPage(newPage)
  }
  const handleChangeRowsBidPerPage = event => {
    setRowsBidPage(+event.target.value)
    setBidPage(0)
  }

  const handleMarketTimeChange = event => {
    setSelectedMarketTimeValue(event.target.value)
  }

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        if (data.success) {
          setBid(data.data)
        } else {
          console.log('Error while fetching bids')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  let getAllGames = () => {
    getAllBets()
      .then(data => {
        if (data.success) {
          setGameTypeData(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  let getWinners = () => {
    winningReport(
      dayjs(date).format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
      selectedGameValue,
      selectedMarketTimeValue
    )
      .then(data => {
        if (data.data != null) {
          console.log(data, 'this is data')
          setRows(data.data)
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
      })
  }
  useEffect(() => {
    getAllBids()
    getAllGames()
  }, [])

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Winning History Report</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', flexWrap: 'wrap' }}>
          <FormControl style={{ width: '14rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={date}
                onChange={date => {
                  setDate(date)
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '18rem' }} value={selectedGameValue} onChange={handleGameSelectChange}>
              <MenuItem value={0}>-- Select game name --</MenuItem>
              {bid &&
                bid.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Market Time</Typography>
            <Select style={{ width: '23rem' }} value={selectedMarketTimeValue} onChange={handleMarketTimeChange}>
              <MenuItem value={0}>-- Select Session --</MenuItem>
              <MenuItem value='OPEN'>Open Market</MenuItem>
              <MenuItem value='CLOSE'>Close Market</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button
              onClick={getWinners}
              style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}
            >
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
              {rows?.slice(bidPage * rowsBidPage, bidPage * rowsBidPage + rowsBidPage).map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columnBid.map((column, index) => {
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.id == 'userName'
                            ? row?.playerId?.name
                            : column.id == 'gameName'
                            ? row?.betCategoryId?.name
                            : column.id == 'gameType'
                            ? row?.betId?.name
                            : column.id == 'amount'
                            ? row?.winAmount
                            : column.id == 'points'
                            ? row?.bidAmount
                            : column.id == 'txId'
                            ? row?.gameId
                            : column.id == 'openPaana'
                            ? row?.openPana
                              ? row?.openPana
                              : 'N/A'
                            : column.id == 'openDigit'
                            ? row?.openPanaDigit
                              ? row?.openPanaDigit
                              : 'N/A'
                            : column.id == 'closePaana'
                            ? row?.closePana
                              ? row?.closePana
                              : 'N/A'
                            : column.id == 'closeDigit'
                            ? row?.closePanaDigit
                              ? row?.closePanaDigit
                              : 'N/A'
                            : column.id == 'txDate'
                            ? dayjs(row?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                            : 'N/A'}
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
          page={bidPage}
          count={rows.length}
          rowsPerPage={rowsBidPage}
          component='div'
          onPageChange={handleChangeBidPerPage}
          onRowsPerPageChange={handleChangeRowsBidPerPage}
        />
      </Card>
    </>
  )
}

export default WinningReport
