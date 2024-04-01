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
import { bidWinReport, getBetCategory } from 'src/helpers'
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
    id: 'win',
    label: 'Win amount',
    minWidth: 170,
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
  let today = new Date()
  const [Bid, setBidPage] = useState(0)
  const [rowsBidPage, setrowsBidPage] = useState(10)
  const [isBidAmount, setBidAmount] = useState(true)
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [date, setDate] = useState(today)
  const [bidWin, setBidWin] = useState([])
  const [WinAmount, setWinAmount] = useState()
  const [rowsWinAmount, setrowsWinAmount] = useState(10)
  const [err, setErr] = useState('')
  const [isShow, setShow] = useState(false)

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
  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        if (data.success) {
          setBid(data.data)
        } else {
          if (data.message == 'Unauthorized User') {
            router.push('/admin/login')
          }
          console.log(' getBetCategory err', data.message)
        }
      })
      .catch(err => {
        console.log('  err', err)
      })
  }

  let validator = () => {
    if (selectedGameValue == 0) {
      setErr('Please select game name')
      return false
    } else {
      setErr('')
      return true
    }
  }

  let bidWinReportApi = () => {
    let params = {
      date: dayjs(date).format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue
    }
    if (validator()) {
      console.log('params', params)
      bidWinReport(params)
        .then(data => {
          if (data.success) {
            setBidWin(data.data)
            setShow(true)
          } else {
            setErr(data.message)
          }
        })
        .catch(e => {
          setErr(e)
        })
    }
  }

  useEffect(() => {
    getAllBids()
  }, [])
  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Winning History Report</Typography>
        <div style={{ display: 'flex', gap: '2rem', margin: '10px 0' }}>
          <FormControl style={{ width: '14rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={dayjs(date)}
                onChange={date => {
                  setDate(date)
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '23rem' }} value={selectedGameValue} onChange={handleGameSelectChange}>
              <MenuItem value={0}>-- Select game name --</MenuItem>
              {bid &&
                bid.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}
              onClick={bidWinReportApi}
            >
              Submit
            </Button>
          </div>
        </div>
        {err ? <Typography color='red'>{err}</Typography> : null}
      </Card>

      {isShow ? (
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
              <Typography variant='body1'>₹ {bidWin[0].totalBid}</Typography>
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
              <Typography variant='body1'>₹ {bidWin[0].totalWin}</Typography>
              <Button onClick={toggleCard2} style={{ backgroundColor: '#9155FD', color: 'white', height: '1.5rem' }}>
                {isCardVisible2}View
              </Button>
            </div>
            {bidWin[0].totalProfit > 0 ? (
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
                  ₹ {bidWin[0].totalProfit}
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '26%',
                  backgroundColor: 'red',
                  padding: '10px',
                  borderRadius: '5px'
                }}
              >
                <Typography variant='body1' style={{ color: 'white', fontWeight: '500' }}>
                  Total Loss Amount
                </Typography>
                <Typography variant='body1' style={{ color: 'white', fontWeight: '500' }}>
                  ₹ {bidWin[0].totalProfit}
                </Typography>
              </div>
            )}
          </div>
        </Card>
      ) : null}

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
                {bidWin.slice(Bid * rowsBidPage, Bid * rowsBidPage + rowsBidPage).map((row, rowIndex) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnBid.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'gameName' ? (
                              <span>{row.gameName}</span>
                            ) : column.id === 'userName' ? (
                              <span>{row.playerName}</span>
                            ) : column.id === 'session' ? (
                              <span>{row.session}</span>
                            ) : column.id === 'bidTXID' ? (
                              <span>{row.gameId}</span>
                            ) : column.id === 'gameType' ? (
                              <span>{row.bet != null ? row.bet : 'test'}</span>
                            ) : column.id === 'points' ? (
                              <span>{row.winnerData.winAmount}</span>
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={bidWin.length}
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
                {bidWin.slice(Bid * rowsBidPage, Bid * rowsBidPage + rowsBidPage).map((row, rowIndex) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnBid.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'gameName' ? (
                              <span>{row.gameName}</span>
                            ) : column.id === 'userName' ? (
                              <span>{row.playerName}</span>
                            ) : column.id === 'session' ? (
                              <span>{row.session}</span>
                            ) : column.id === 'bidTXID' ? (
                              <span>{row.gameId}</span>
                            ) : column.id === 'gameType' ? (
                              <span>{row.bet != null ? row.bet : 'test'}</span>
                            ) : column.id === 'points' ? (
                              <span>{row.winnerData.bidAmount}</span>
                            ) : column.id === 'win' ? (
                              <span>{row.winnerData.winAmount}</span>
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
