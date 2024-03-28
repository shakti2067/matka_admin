import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputBox from 'src/components/InputBox'
import { useState, useEffect } from 'react'
import {
  createGameWinner,
  getBetCategory,
  getGlobalSettings,
  createOpenWinner,
  declareOpenWinner,
  createCloseWinner,
  declareCloseWinner,
  getWinnerHistory,
  getWinnerResultChart,
  deleteWinnerResult
} from 'src/helpers'
import dayjs from 'dayjs'
import { EmailNewsletter } from 'mdi-material-ui'

const columnGameResult = [
  {
    id: 'name',
    label: '#',
    minWidth: 10
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 190
  },
  {
    id: 'resultDate',
    label: 'Result Date',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'openDeclareDate',
    label: 'Open Declare Date',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'closeDeclareDate',
    label: 'Close Declare Date',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'openPana',
    label: 'Open Pana',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'closePana',
    label: 'Close Pana',
    minWidth: 170,
    align: 'left'
  }
]
const showWinner = [
  {
    id: 'name',
    label: '#',
    minWidth: 10
  },
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 190
  },
  {
    id: 'bidPoints',
    label: 'Bid Points',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'winningAmount',
    label: 'Winning Amount',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'bidTxId',
    label: 'Bid TX ID',
    minWidth: 170,
    align: 'left'
  }
]
function createGameResult(name, gameName, resultDate, openDeclareDate, closeDeclareDate, openPana, closePana) {
  return {
    name,
    gameName,
    resultDate,
    openDeclareDate,
    closeDeclareDate,
    openPana,
    closePana
  }
}
const rowGameResult = [
  createGameResult(1, 'STAR MORNING', '27 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', ''),
  createGameResult(2, 'STAR MORNING', '28 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', ''),
  createGameResult(3, 'STAR MORNING', '29 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', '')
]

function DeclareResult() {
  const today = new Date()

  const [gameResult, setGameResult] = useState(0)
  const [rowsGameResult, setRowsGameResult] = useState(10)
  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false)
  const [sliderImageId, setSliderImageId] = useState('')
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [pana, setPana] = useState([])
  const [selectedPana, setSelectedPana] = useState(0)
  const [digit, setDigit] = useState(0)
  const [save, setSave] = useState(false)
  const [isPopupOpenChangePass, setPopupOpenChangePass] = useState(false)
  const [createWinner, setCreateWinner] = useState([])
  const [selectResultDate, setSelectResultDate] = useState(today)
  const [selectResultHistoryDate, setSelectResultHistoryDate] = useState(today)
  const [deleteResult, setDeleteResult] = useState({
    betCategoryId: '',
    resultDate: '',
    state: ''
  })

  const [amounts, setAmounts] = useState({
    totalBidAmount: 0,
    totalWinAmount: 0
  })

  const [gameResultHistory, setGameResultHistory] = useState([])
  const togglePopupDelete = event => {
    setPopupOpenDelete(!isPopupOpenDelete)
    setSliderImageId(event.target.value)
  }
  const [error, setError] = useState('')

  const handleChangeGameResultPage = (event, newPage) => {
    setGameResult(newPage)
  }
  const handleChangeGameResultPerPage = event => {
    setRowsGameResult(+event.target.value)
    setGameResult(0)
  }

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }
  const handlePanaSelect = event => {
    setSelectedPana(event.target.value)
    let lastDigit = sumOfDigitsAndLastDigit(event.target.value)

    setDigit(lastDigit)
  }
  const handleMarketTimeChange = event => {
    setSelectedMarketTimeValue(event.target.value)
  }

  const togglePopupChangePass = () => {
    if (createWinner.length == 0) {
      if (selectedMarketTimeValue == 'OPEN') {
        createOpenWinnerWithData()
      } else {
        createCloseWinnerWithData()
      }
    } else {
      setPopupOpenChangePass(!isPopupOpenChangePass)
    }
  }

  let handleOpen = () => {
    if (selectedGameValue != 0 && selectedMarketTimeValue != 0) {
      setOpen(true)
    }
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

  // Sum of digit function
  function sumOfDigitsAndLastDigit(number) {
    if (number) {
      let sum = 0
      let temp = number
      while (temp > 0) {
        sum += temp % 10
        temp = Math.floor(temp / 10)
      }

      return sum % 10
    } else {
      return number
    }
  }

  const globalSettingApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setPana(data.data.gameNumber.fullSangam.openAnk)
        } else {
          console.log('error', data.message)
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getAllBids()
    globalSettingApi()
    getWinnerHistoryFromServer(dayjs().format('YYYY-MM-DD'))
  }, [])

  let createOpenWinnerWithData = () => {
    let params = {
      date: dayjs().format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue,
      state: 'OPEN',
      digit: digit.toString(),
      pana: selectedPana
    }
    createOpenWinner(params)
      .then(data => {
        if (data.success) {
          console.log(data, 'this is data')
          setCreateWinner(data.data)
          setAmounts({
            totalBidAmount: data.totalBidAmount,
            totalWinAmount: data.totalWinAmount
          })
          setPopupOpenChangePass(!isPopupOpenChangePass)
        } else {
          console.log('error', data.message)
          setError(data.message)
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
        setError(err)
      })
  }
  let declareResult = () => {
    let params = {
      date: dayjs(selectResultDate).format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue,
      state: 'OPEN',
      digit: digit.toString(),
      pana: selectedPana
    }
    declareOpenWinner(params)
      .then(data => {
        if (data.success) {
          console.log(data.data, 'this is data')
          setSelectedPana(0)
          setDigit(0)
          setCreateWinner([])
          setSave(false)
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
        } else {
          console.log('error')
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
          setError(data.message)
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
        setError(err)
      })
  }

  let createCloseWinnerWithData = () => {
    let params = {
      date: dayjs().format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue,
      state: 'CLOSE',
      digit: digit.toString(),
      pana: selectedPana
    }
    createCloseWinner(params)
      .then(data => {
        if (data.success) {
          console.log(data, 'this is data')
          setCreateWinner(data.data)
          setAmounts({
            totalBidAmount: data.totalBidAmount,
            totalWinAmount: data.totalWinAmount
          })
          setPopupOpenChangePass(!isPopupOpenChangePass)
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
        } else {
          console.log('error')
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
          setError(data.message)
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
        setError(err)
      })
  }
  let declareCloseResult = () => {
    let params = {
      date: dayjs(selectResultDate).format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue,
      state: 'CLOSE',
      digit: digit.toString(),
      pana: selectedPana
    }
    declareCloseWinner(params)
      .then(data => {
        if (data.success) {
          console.log(data.data, 'this is data')
          setSelectedPana(0)
          setDigit(0)
          setCreateWinner([])
          setSave(false)
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
        } else {
          console.log('error')
          setError(data.message)
          getWinnerHistoryFromServer(dayjs(new Date()).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
        setError(err)
      })
  }
  let getWinnerHistoryFromServer = date => {
    getWinnerResultChart(date, dayjs().format('YYYY-MM-DD'))
      .then(data => {
        if (data.success) {
          console.log(data, 'this is data')
          setGameResultHistory(data.data)
        } else {
          console.log('error')
          setError(data.message)
        }
      })
      .catch(err => {
        console.log(err, 'this is error')
        setError(err)
      })
  }

  let handleDateChange = newValue => {
    setSelectResultHistoryDate(newValue)
    getWinnerHistoryFromServer(dayjs(newValue).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
  }

  const handleOpenDeleteResultPopup = row => {
    setDeleteResult({
      betCategoryId: row?.betCategoryId._id,
      resultDate: dayjs(row?.resultDate).format('YYYY-MM-DD'),
      state: 'OPEN' // or any other appropriate value
    })
    setPopupOpenDelete(!isPopupOpenDelete)
  }

  const deleteOpenResult = () => {
    deleteWinnerResult(deleteResult)
      .then(data => {
        if (data.success) {
          console.log('data', data.message)
          getWinnerHistoryFromServer(dayjs(today).format('YYYY-MM-DD'))
          setPopupOpenDelete(!isPopupOpenDelete)
        } else {
          console.log('error', error)
        }
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Select Game</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '10px' }}>
          <div>
            <Typography>Result Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={dayjs(selectResultDate)}
                onChange={newValue => setSelectResultDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '25rem' }} value={selectedGameValue} onChange={handleGameSelectChange}>
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
            <Typography>Session</Typography>
            <Select style={{ width: '15rem' }} value={selectedMarketTimeValue} onChange={handleMarketTimeChange}>
              <MenuItem value={0}>-- Select Session --</MenuItem>
              <MenuItem value='OPEN'>Open Market</MenuItem>
              <MenuItem value='CLOSE'>Close Market</MenuItem>
            </Select>
          </FormControl>
          <div style={{ alignItems: 'end', display: 'flex' }}>
            <Button
              style={{
                backgroundColor: '#9155FD',
                color: 'white',
                height: '3rem',
                width: '10rem',
                marginBottom: '5px'
              }}
              onClick={handleOpen}
            >
              Go
            </Button>
          </div>
        </div>
      </Card>
      {open ? (
        <Card style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant='h6'>Declare Result</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '10px' }}>
            <FormControl>
              <Typography>Panna:</Typography>
              <Select style={{ width: '25rem' }} value={selectedPana} onChange={handlePanaSelect}>
                <MenuItem value={0}>-- Select pana --</MenuItem>
                {pana &&
                  pana.map(d => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <Typography>Digit</Typography>
              <Grid item xs={12}>
                <TextField fullWidth type='number' value={digit} />
              </Grid>
            </FormControl>
            <div style={{ alignItems: 'end', display: 'flex' }}>
              {createWinner.length == 0 && (
                <Button
                  style={{
                    backgroundColor: '#9155FD',
                    color: 'white',
                    height: '3rem',
                    width: '10rem',
                    marginBottom: '5px',
                    marginRight: '10px'
                  }}
                  onClick={() => {
                    setSave(true)
                  }}
                >
                  save
                </Button>
              )}
              {save ? (
                <div>
                  <Button
                    style={{
                      backgroundColor: '#9155FD',
                      color: 'white',
                      height: '3rem',
                      width: '10rem',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                    onClick={togglePopupChangePass}
                  >
                    show winner
                  </Button>
                  {isPopupOpenChangePass && (
                    <div>
                      <div
                        className='overlay'
                        onClick={togglePopupChangePass}
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
                        }}
                      />
                      <div
                        style={{
                          borderRadius: '5px',
                          width: '70%',
                          position: 'fixed',
                          // top: '20%',
                          height: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#F7F7F7',
                          padding: '20px',
                          zIndex: 9999 // Ensure the popup is above the overlay
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='h6'>Winner List</Typography>
                          <Typography variant='h6'>Total Bid Amount : {amounts.totalBidAmount}</Typography>
                          <Typography variant='h6'>Total Winning Amount : {amounts.totalWinAmount}</Typography>

                          <div onClick={togglePopupChangePass} style={{ cursor: 'pointer' }}>
                            &#10006;
                          </div>
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                          <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                              <TableRow>
                                {showWinner.map((column, i) => (
                                  <TableCell key={i} align={column.align} sx={{ minWidth: column.minWidth }}>
                                    {column.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {createWinner &&
                                createWinner.map((row, index) => {
                                  return (
                                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{row?.player?.name}</TableCell>
                                      <TableCell>{row?.amount}</TableCell>
                                      <TableCell>{row?.userWinAmount || row?.winAmount}</TableCell>
                                      <TableCell>{row?.bet?.name}</TableCell>
                                      <TableCell>TNX_{row?.bet?._id}</TableCell>
                                    </TableRow>
                                  )
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  )}
                  <Button
                    style={{
                      backgroundColor: '#56CA00',
                      color: 'white',
                      height: '3rem',
                      width: '10rem',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                    onClick={() => {
                      if (selectedMarketTimeValue == 'OPEN') {
                        declareResult()
                        setError('')
                      } else {
                        declareCloseResult()
                        setError('')
                      }
                    }}
                  >
                    Declare
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          {error ? <Typography color='red'>{error}</Typography> : null}
        </Card>
      ) : null}

      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <div style={{ padding: '20px' }}>
          <Typography variant='h6'>Game Result History</Typography>
          <div style={{ marginTop: '15px', marginBottom: '10px' }}>
            <Typography>Select Result Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={dayjs(selectResultHistoryDate)}
                onChange={newValue => handleDateChange(newValue)}
              />
            </LocalizationProvider>
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columnGameResult.map((column, key) => (
                  <TableCell key={key} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gameResultHistory.map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.betCategoryId?.name}</TableCell>
                    <TableCell>{dayjs(row?.resultDate).format('DD MMM YYYY')}</TableCell>
                    <TableCell>{dayjs(row?.openPanaResultDate).format('DD MM YYYY')}</TableCell>

                    <TableCell>
                      {row?.closePanaResultDate ? dayjs(row?.closePanaResultDate).format('DD MM YYYY') : '-'}
                    </TableCell>
                    <TableCell>
                      {row?.openPana}-{row?.openPanaDigit}
                      <Button
                        style={{ marginLeft: '10px' }}
                        variant='contained'
                        color='error'
                        onClick={() => handleOpenDeleteResultPopup(row)}
                        // onClick={togglePopupDelete}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      {row?.closePanaDigit}-{row?.closePana}
                      {/* {row.closePana ? (
                        <Button
                          style={{ marginLeft: '10px' }}
                          variant='contained'
                          color='error'
                          onClick={() => handleOpenDeleteResultPopup(row)}
                          // onClick={togglePopupDelete}
                        >
                          Delete
                        </Button>
                      ) : null} */}
                    </TableCell>
                    {/* {columnGameResult.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'openPana' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography variant='body2'>124-7</Typography>
                                <Button
                                  style={{
                                    backgroundColor: '#f46a6a',
                                    color: 'white',
                                    fontSize: '12px',
                                    padding: '4px'
                                  }}
                                  onClick={togglePopupDelete}
                                >
                                  Delete
                                </Button>
                              </div>
                            ) : column.id === 'closePana' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography variant='body2'>8-288</Typography>
                                <Button
                                  style={{
                                    backgroundColor: '#f46a6a',
                                    color: 'white',
                                    fontSize: '12px',
                                    padding: '4px'
                                  }}
                                  onClick={togglePopupDelete}
                                >
                                  Delete
                                </Button>{' '}
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                      })} */}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rowGameResult.length}
          rowsPerPage={rowsGameResult}
          page={gameResult}
          onPageChange={handleChangeGameResultPage}
          onRowsPerPageChange={handleChangeGameResultPerPage}
        />
      </Card>
      {isPopupOpenDelete && (
        <div
          style={{
            borderRadius: '5px',
            width: '30%',
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F7F7F7',
            padding: '20px',
            boxShadow: '0 0 10px #d3bdff'
          }}
        >
          <div>
            <h5 style={{ marginTop: '5px' }}>Are you sure you want to delete this?</h5>
            <div>
              <Button
                onClick={togglePopupDelete}
                style={{ backgroundColor: '#f46a6a', color: 'white', width: '6rem', padding: '5px' }}
              >
                No
              </Button>
              <Button
                style={{
                  backgroundColor: '#9155FD',
                  color: 'white',
                  width: '6rem',
                  padding: '5px',
                  marginLeft: '30px'
                }}
                onClick={deleteOpenResult}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeclareResult
