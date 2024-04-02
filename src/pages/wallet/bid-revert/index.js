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
import { bidRevert, getAllBets, getBetCategory, userGameHistory, userGameHistoryReport } from 'src/helpers'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

const columnBid = [
  {
    id: 'name',
    label: '#',
    minWidth: 120
  },
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 120
  },
  {
    id: 'points',
    label: 'Points',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'gameType',
    label: 'Game Type',
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

function BidHistory() {
  let router = useRouter()
  const [bidPage, setBidPage] = useState(0)
  const [rowsBidPage, setRowsBidPage] = useState(10)
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [game, setGame] = useState([])
  const [date, setDate] = useState(dayjs())
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

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

  let validator = () => {
    if (selectedGameValue == 0) {
      setError('Please select game name')
      return false
    }
    return true
  }

  let userGameHistoryApi = (startDate = dayjs().format('YYYY-MM-DD')) => {
    let endDate = dayjs().format('YYYY-MM-DD')
    let betId = ''
    let betCategoryId = selectedGameValue

    if (validator()) {
      userGameHistoryReport(startDate, endDate, betId, betCategoryId)
        .then(data => {
          if (data.success) {
            setGame(data.data)
            setError('')
          } else {
            console.log('error')
            setError(data.message)
            setGame([])
          }
        })
        .catch(e => {
          console.log('error', e)
          // setError(e)
        })
    }
  }

  let bidRevertApi = () => {
    let prams = {
      betCategoryId: selectedGameValue,
      date: dayjs(date).format('YYYY-MM-DD')
    }
    bidRevert(prams)
      .then(data => {
        if (data.success) {
          console.log(data.message)
          setSuccessMsg(data.message)
          setGame([])
        } else {
          setError(data.message)
          setSuccessMsg('')
        }
      })
      .catch(e => {
        setError(e)
        setSuccessMsg('')
      })
  }
  useEffect(() => {
    getAllBids()
    // userGameHistoryApi()
  }, [])

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Bid Revert</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

          <Button
            style={{ backgroundColor: '#9155FD', color: 'white' }}
            onClick={() => userGameHistoryApi(dayjs(date).format('YYYY-MM-DD'))}
          >
            Submit
          </Button>
        </div>
        {error ? <Typography color='red'>{error}</Typography> : null}
        {successMsg ? <Typography color='green'>{successMsg}</Typography> : null}
      </Card>
      {game.length > 0 ? (
        <div>
          <Button variant='contained' sx={{ marginTop: '10px' }} onClick={bidRevertApi}>
            Revert bid
          </Button>
          <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
            <Typography variant='h6' style={{ padding: '20px' }}>
              Bid Revert List
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
                                <span
                                  style={{ color: 'blue', cursor: 'pointer' }}
                                  onClick={() => {
                                    router.push({
                                      pathname: '/users/userdetails',
                                      query: { userId: row.playerId._id }
                                    })
                                  }}
                                >
                                  {row.playerId.name}{' '}
                                </span>
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              page={bidPage}
              count={game.length}
              rowsPerPage={rowsBidPage}
              component='div'
              onPageChange={handleChangeBidPerPage}
              onRowsPerPageChange={handleChangeRowsBidPerPage}
            />
          </Card>{' '}
        </div>
      ) : null}
    </>
  )
}

export default BidHistory
