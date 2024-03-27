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
import { getAllBets, getBetCategory, userGameHistory, userGameHistoryReport } from 'src/helpers'
import dayjs from 'dayjs'

const columnBid = [
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 120
  },
  {
    id: 'bidTXID',
    label: 'Bid TX ID',
    minWidth: 160,
    align: 'right'
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'gameType',
    label: 'Game Type',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'session',
    label: 'Session',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'openPana',
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
    id: 'closePana',
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
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right'
  }
]
function createBid(
  userName,
  bidTXID,
  gameName,
  gameType,
  session,
  openPaana,
  openDigit,
  closePaana,
  closeDigit,
  points,
  action
) {
  return {
    userName,
    bidTXID,
    gameName,
    gameType,
    session,
    openPaana,
    openDigit,
    closePaana,
    closeDigit,
    points,
    action
  }
}
const rowBid = [
  createBid('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 'data', 'data2', 'data3', 'data4', 'data5')
]

function BidHistoryReport() {
  const [bidPage, setBidPage] = useState(0)
  const [rowsBidPage, setRowsBidPage] = useState(10)
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedGameType, setSelectedGameType] = useState(0)
  const [gameTypeData, setGameTypeData] = useState([])
  const [game, setGame] = useState([])
  const [date, setDate] = useState(dayjs())
  console.log('selectedGameType', selectedGameType)

  const today = new Date()

  const handleChangeBidPerPage = (event, newPage) => {
    setBidPage(newPage)
  }
  const handleChangeRowsBidPerPage = event => {
    setRowsBidPage(+event.target.value)
    setBidPage(0)
  }

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }

  const handleGameTypeSelectChange = event => {
    setSelectedGameType(event.target.value)
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
  let userGameHistoryApi = (startDate = dayjs().format('YYYY-MM-DD')) => {
    let endDate = dayjs().format('YYYY-MM-DD')
    let betId
    let betCategoryId
    if (selectedGameType == 0 || selectedGameType == 1) {
      betId = ''
    } else {
      betId = selectedGameType
    }
    if (selectedGameValue == 0) {
      betCategoryId = ''
    } else {
      betCategoryId = selectedGameValue
    }

    userGameHistoryReport(startDate, endDate, betId, betCategoryId)
      .then(data => {
        if (data.success) {
          setGame(data.data)
        } else {
          console.log('error')
          setGame([])
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  }
  useEffect(() => {
    getAllBids()
    getAllGames()
    // userGameHistoryApi()
  }, [])

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Bid History Report</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', alignItems: 'center' }}>
          <FormControl>
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
            <Select value={selectedGameValue} onChange={handleGameSelectChange}>
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
            <Typography>Game Type</Typography>
            <Select value={selectedGameType} onChange={handleGameTypeSelectChange}>
              <MenuItem value={0}>-- Select game type --</MenuItem>
              <MenuItem value={1}>All Type</MenuItem>

              {gameTypeData &&
                gameTypeData.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            style={{ backgroundColor: '#9155FD', color: 'white' }}
            onClick={() => userGameHistoryApi(dayjs(date).format('YYYY-MM-DD'))}
          >
            Submit
          </Button>
        </div>
      </Card>
      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <Typography variant='h6' style={{ padding: '20px' }}>
          Bid History List
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
              {game.slice(bidPage * rowsBidPage, bidPage * rowsBidPage + rowsBidPage).map((row, rowIndex) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                    {columnBid.map(column => {
                      const value = row[column.id]

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'name' ? (
                            <span>{rowIndex + 1}</span>
                          ) : column.id === 'gameName' ? (
                            <span>{row.betCategoryId.name}</span>
                          ) : column.id === 'userName' ? (
                            <span>{row.playerId.name}</span>
                          ) : column.id === 'session' ? (
                            <span>{row.state}</span>
                          ) : column.id === 'bidTXID' ? (
                            <span>{row.gameId}</span>
                          ) : column.id === 'gameType' ? (
                            <span>{row.betId != null ? row.betId.name : 'test'}</span>
                          ) : column.id === 'date' ? (
                            <span>{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                          ) : column.id === 'points' ? (
                            <span>{row.amount}</span>
                          ) : column.id === 'openPana' ? (
                            <span>
                              {row.betId != null
                                ? row.betId.name == 'Single Pana' && row.state == 'OPEN'
                                  ? row.choiceNumber
                                  : row.betId.name == 'Full Sangam'
                                  ? row.openPana
                                  : row.betId.name == 'Half Sangam' && row.state == 'CLOSE'
                                  ? row.openPana
                                  : row.betId.name == 'Tripple Pana' && row.state == 'OPEN'
                                  ? row.choiceNumber
                                  : row.betId.name == 'Double Pana' && row.state == 'OPEN'
                                  ? row.choiceNumber
                                  : 'N/A'
                                : 'N/A'}
                            </span>
                          ) : column.id === 'closePana' ? (
                            <span>
                              {row.betId != null
                                ? row.betId.name == 'Single Pana' && row.state == 'CLOSE'
                                  ? row.choiceNumber
                                  : row.betId.name == 'Full Sangam'
                                  ? row.closePana
                                  : row.betId.name == 'Half Sangam' && row.state == 'OPEN'
                                  ? row.closePana
                                  : row.betId.name == 'Tripple Pana' && row.state == 'CLOSE'
                                  ? row.choiceNumber
                                  : row.betId.name == 'Double Pana' && row.state == 'CLOSE'
                                  ? row.choiceNumber
                                  : 'N/A'
                                : 'N/A'}
                            </span>
                          ) : column.id === 'openDigit' ? (
                            <span>
                              {row.state == 'OPEN' && row.betId.name == 'Single Digit'
                                ? row.choiceNumber
                                : row.betId.name == 'Jodi Digit'
                                ? row.choiceNumber?.split('')[0]
                                : row.betId != null
                                ? row.betId.name == 'Single Pana' && row.state == 'OPEN'
                                  ? row.choiceNumber
                                  : row.betId.name == 'Full Sangam'
                                  ? row.ank
                                  : row.betId.name == 'Half Sangam'
                                  ? row.ank
                                  : row.betId.name == 'Tripple Pana' && row.state == 'OPEN'
                                  ? row.ank
                                  : row.betId.name == 'Double Pana' && row.state == 'OPEN'
                                  ? row.ank
                                  : 'N/A'
                                : 'N/A'}
                            </span>
                          ) : column.id === 'closeDigit' ? (
                            <span>
                              {row.state == 'CLOSE' && row.betId.name == 'Single Digit'
                                ? row.choiceNumber
                                : row.state == 'CLOSE' && row.betId.name == 'Jodi Digit'
                                ? row.choiceNumber?.split('')[1]
                                : row.betId != null
                                ? row.betId.name == 'Full Sangam'
                                  ? row.ankClose
                                  : row.betId.name == 'Tripple Pana' && row.state == 'CLOSE'
                                  ? row.ank
                                  : row.betId.name == 'Double Pana' && row.state == 'CLOSE'
                                  ? row.ank
                                  : 'N/A'
                                : 'N/A'}
                            </span>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
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

export default BidHistoryReport
